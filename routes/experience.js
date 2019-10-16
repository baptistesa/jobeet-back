var express = require('express');
var router = express.Router();

var experience = require("../queries/experience");
var middleware = require("../middleware/auth");

router.post('/add', middleware.verifyUser, experience.addExperience);
router.delete('/delete/:id', middleware.verifyUser, experience.removeExperience);

module.exports = router;