var express = require('express');
var router = express.Router();
var multer = require('multer');

var db = require("../sql/init");
var Entreprises = require("../queries/entreprises");
var auth = require("../queries/jwt");

var authMiddleware = require("../middleware/auth");

router.get('/getEntreprises', authMiddleware.verifyUser, Entreprises.getEntreprises);
router.get('/getEntreprise/:id', authMiddleware.verifyUser, Entreprises.getEntreprise);
router.get('/getEmployees/:id', authMiddleware.verifyUser, Entreprises.getEmployees);
router.get('/getEntrepriseOffres/:id', authMiddleware.verifyUser, Entreprises.getEntrepriseOffres);
router.get('/getCount', authMiddleware.verifyUser, Entreprises.getCount);
router.post('/addEntreprise', authMiddleware.verifyUser, Entreprises.addEntreprise);
router.delete('/deleteEntreprise/:id', authMiddleware.verifyUser, Entreprises.deleteEntreprise);
router.put('/updateDescription', authMiddleware.verifyUser, Entreprises.updateDescription);

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
                let id_entreprise = decodedToken.data.id_entreprise
                let filename = file.fieldname + '-' + Date.now() + id_entreprise + "." + ext
                db.query("UPDATE entreprises SET picture_path=? WHERE id=?", [filename, id_entreprise], function (error, results, fields) {
                    if (error) {
                        console.log(error)
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