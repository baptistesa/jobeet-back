var express = require('express');
var router = express.Router();

var competences = require("../queries/competences");

router.get('/all', competences.getAllCompetences);
router.post('/create', competences.createCompetence);
router.post('/addToUser', competences.addCompetencesToUser);
router.delete('/delete/:id', competences.deleteCompetenceToUser);

module.exports = router;
