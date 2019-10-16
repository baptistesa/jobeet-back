var express = require('express');
var router = express.Router();

var Offres = require("../queries/offres");
var auth = require("../queries/jwt");

var algo = require("../queries/algo_matching");

var middleware = require("../middleware/auth");

router.get('/getOffres', middleware.verifyUser, Offres.getOffres);
router.get('/getOffre/:id', middleware.verifyUser, Offres.getOffre);
router.post('/addOffre', middleware.verifyUser, Offres.addOffre);
router.delete('/deleteOffre', middleware.verifyUser, Offres.deleteOffre);
router.get('/getCount', middleware.verifyUser, Offres.getCount);
router.get('/getCompetences/:offre_id', middleware.verifyUser, Offres.getCompetencesById);

router.get("/algo", algo.runAlgo);

module.exports = router;
