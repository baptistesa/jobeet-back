var express = require('express');
var router = express.Router();

var Entreprises = require("../queries/entreprises");
var auth = require("../queries/jwt");

router.get('/getEntreprises', Entreprises.getEntreprises);
router.get('/getEntreprise/:id', Entreprises.getEntreprise);
router.post('/addEntreprise', Entreprises.addEntreprise);

module.exports = router;