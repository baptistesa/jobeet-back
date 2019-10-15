var express = require('express');
var router = express.Router();

var Entreprises = require("../queries/entreprises");
var auth = require("../queries/jwt");

router.get('/getEntreprises', Entreprises.getEntreprises);
router.get('/getEntreprise/:id', Entreprises.getEntreprise);
router.get('/getEmployees/:id', Entreprises.getEmployees);
router.get('/getEntrepriseOffres/:id', Entreprises.getEntrepriseOffres);
router.get('/getCount', Entreprises.getCount);
router.post('/addEntreprise', Entreprises.addEntreprise);
router.delete('/deleteEntreprise/:id', Entreprises.deleteEntreprise);

module.exports = router;