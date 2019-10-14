var express = require('express');
var router = express.Router();

var Matchs = require("../queries/matchs");

router.get('/addMatch', Matchs.addMatch);
router.get('/deleteMatch/:id', Matchs.deleteMatch);
router.get('/getUserMatch', Matchs.getUserMatch);
router.get('/getRecruteurMatch', Matchs.getRecruteurMatch);
router.get('/acceptMatch', Matchs.acceptMatch);

module.exports = router;