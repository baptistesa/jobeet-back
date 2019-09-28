var express = require('express');
var router = express.Router();
var multer = require('multer');

var Users = require("../queries/users");

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
        let filename_arr = file.originalname.split(".")
        let ext = filename_arr[filename_arr.length - 1];
        if (ext != "jpg" && ext != "JPG" && ext != "png" && ext != "PNG" && ext != "jpeg" && ext != "JPEG")
            cb("invalid file", null);
        cb(null, file.fieldname + '-' + Date.now() + "." + file.originalname.split("."))
    }
});
var upload = multer({ storage: storage });
router.post('/upload', authMiddleware.verifyUser, upload.single('file'), (req, res, next) => {
    res.json({
        "status" : "ok",
        'message': 'File uploaded successfully'
    });
});

module.exports = router;
