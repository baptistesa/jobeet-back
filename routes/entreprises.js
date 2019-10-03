var express = require('express');
var router = express.Router();

var Entreprises = require("../queries/entreprises");
var auth = require("../queries/jwt");

router.get('/getEntreprises', Entreprises.getEntreprises);
router.get('/getEntreprise/:id', Entreprises.getEntreprise);
router.get('/getCount', Entreprises.getCount);
router.post('/addEntreprise', Entreprises.addEntreprise);
router.post('/deleteEntreprise/:id', Entreprises.deleteEntreprise);

module.exports = router;