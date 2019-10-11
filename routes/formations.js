var express = require('express');
var router = express.Router();

var formations = require("../queries/formations");

router.post('/add', formations.addFormation)

module.exports = router;