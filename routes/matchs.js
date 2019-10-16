var express = require('express');
var router = express.Router();

var Matchs = require("../queries/matchs");
var middleware = require("../middleware/auth");

router.post('/addMatch', middleware.verifyUser, Matchs.addMatch);
router.delete('/deleteMatch/:id', middleware.verifyUser, Matchs.deleteMatch);
router.get('/getUserMatch', middleware.verifyUser, Matchs.getUserMatch);
router.get('/getRecruteurMatch', middleware.verifyUser, Matchs.getRecruteurMatch);
router.put('/acceptMatch', middleware.verifyUser, Matchs.acceptMatch);

module.exports = router;