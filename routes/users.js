var express = require('express');
var router = express.Router();


var Users = require("../queries/users");

var middleware = require("../middleware/auth");

router.get('/getUsers', middleware.verifyUser, Users.getAllUsers);
router.get('/getUser/:id', middleware.verifyUser, Users.getUser);
router.post('/signup', Users.signup);
router.post('/login', Users.login);

module.exports = router;
