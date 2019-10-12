var express = require('express');
var router = express.Router();

var experience = require("../queries/experience");

router.post('/add', experience.addExperience);
router.post('/delete', experience.removeExperience);

module.exports = router;