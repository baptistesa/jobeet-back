var express = require('express');
var router = express.Router();

var formations = require("../queries/formations");
var middleware = require("../middleware/auth");

router.post('/add', middleware.verifyUser, formations.addFormation)
router.delete('/delete/:id_formation', middleware.verifyUser, formations.deleteFormation);

module.exports = router;