var express = require('express');
var router = express.Router();

var Offres = require("../queries/offres");
var auth = require("../queries/jwt");

var algo = require("../queries/algo_matching");

var authMiddleware = require("../middleware/auth");

router.get('/getOffres', Offres.getOffres);
router.get('/getOffre/:id', Offres.getOffre);
router.post('/addOffre', Offres.addOffre);
router.delete('/deleteOffre', Offres.deleteOffre);
router.get('/getCount', Offres.getCount);
router.get('/getCompetences/:offre_id', Offres.getCompetencesById);

router.get("/algo", algo.runAlgo);

module.exports = router;
