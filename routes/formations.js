var express = require('express');
var router = express.Router();

var formations = require("../queries/formations");

router.post('/add', formations.addFormation)
router.delete('/delete/:id_formation', formations.deleteFormation);

module.exports = router;