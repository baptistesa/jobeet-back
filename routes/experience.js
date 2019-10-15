var express = require('express');
var router = express.Router();

var experience = require("../queries/experience");

router.post('/add', experience.addExperience);
router.delete('/delete/:id', experience.removeExperience);

module.exports = router;