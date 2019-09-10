var express = require('express');
var router = express.Router();
var cors = require('cors')

var Users = require("../queries/users");

/* GET home page. DO NOT TOUCH*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUsers', cors(), Users.getAllUsers);
router.get('/getUser/:id', cors(), Users.getUser);

module.exports = router;
