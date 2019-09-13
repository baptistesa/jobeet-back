var express = require('express');
var router = express.Router();

var cors = require('cors');

var Users = require("../queries/users");

var middleware = require("../middleware/auth");

router.get('/getUsers', cors(), middleware.verifyUser, Users.getAllUsers);
router.get('/getUser/:id', cors(), middleware.verifyUser, Users.getUser);
router.post('/signup', cors(), Users.signup);
router.post('/login', cors(), Users.login);

module.exports = router;
