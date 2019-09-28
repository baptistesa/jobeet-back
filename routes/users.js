var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require("../sql/init");

var Users = require("../queries/users");
var auth = require("../queries/jwt")

var authMiddleware = require("../middleware/auth");

router.get('/getUsers', authMiddleware.verifyUser, Users.getAllUsers);
router.get('/getUser/:id', authMiddleware.verifyUser, Users.getUser);
router.post('/signup', Users.signup);
router.post('/login', Users.login);
router.post('/confirm', Users.confirmCode);


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pictures')
    },
    filename: (req, file, cb) => {
        let token = req.headers.authorization

        auth.verifyJWTToken(token)
            .then((decodedToken) => {
                let filename_arr = file.originalname.split(".")
                let ext = filename_arr[filename_arr.length - 1];
                if (ext != "jpg" && ext != "JPG" && ext != "png" && ext != "PNG" && ext != "jpeg" && ext != "JPEG") {
                    cb("invalid file", null);
                    return;
                }
                let id_user = decodedToken.data.id
                let filename = file.fieldname + '-' + Date.now() + id_user + "." + ext
                db.query("UPDATE users SET picture_path=? WHERE id=?", [filename, id_user], function (error, results, fields) {
                    if (error) {
                        cb("Error processing file", null);
                        return;
                    }
                    cb(null, filename)
                })
            })
    }
});
var upload = multer({ storage: storage });
router.post('/upload', authMiddleware.verifyUser, upload.single('picture'), (req, res, next) => {
    res.json({
        "status": "ok",
        'message': 'File uploaded'
    });
});

module.exports = router;
