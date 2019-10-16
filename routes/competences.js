var express = require('express');
var router = express.Router();

var competences = require("../queries/competences");
var middleware = require("../middleware/auth");

router.get('/all', middleware.verifyUser, competences.getAllCompetences);
router.post('/create', middleware.verifyUser,competences.createCompetence);
router.post('/addToUser', middleware.verifyUser, competences.addCompetencesToUser);
router.delete('/delete/:id', middleware.verifyUser, competences.deleteCompetenceToUser);
router.post('/addToOffre', middleware.verifyUser, competences.addCompetencesToOffre);


module.exports = router;
