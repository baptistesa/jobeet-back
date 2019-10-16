var express = require('express');
var router = express.Router();

var messages = require("../queries/messages");
var middleware = require("../middleware/auth");


router.get('/get/:id_room/:id_offre', middleware.verifyUser, messages.getMessages);
router.post('/add', middleware.verifyUser, messages.addMessage);


module.exports = router;
