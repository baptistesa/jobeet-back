var express = require('express');
var router = express.Router();

var Matchs = require("../queries/matchs");

router.post('/addMatch', Matchs.addMatch);
router.delete('/deleteMatch/:id', Matchs.deleteMatch);
router.get('/getUserMatch', Matchs.getUserMatch);
router.get('/getRecruteurMatch', Matchs.getRecruteurMatch);
router.put('/acceptMatch', Matchs.acceptMatch);

module.exports = router;