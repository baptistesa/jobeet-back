var express = require('express');
var router = express.Router();

var competences = require("../queries/competences");

router.get('/exist', competences.existCompetence);
router.post('/create', competences.createCompetence);

module.exports = router;
