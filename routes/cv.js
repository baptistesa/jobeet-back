var express = require('express');
var router = express.Router();


var CV = require("../queries/cv");

var middleware = require("../middleware/auth");

router.post('/add', middleware.verifyUser, CV.addCV);
router.get('/get', middleware.verifyUser, CV.getCV);

module.exports = router;
