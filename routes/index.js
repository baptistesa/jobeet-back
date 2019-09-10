var express = require('express');
var router = express.Router();

var Users = require("../queries/users");

/* GET home page. DO NOT TOUCH*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUsers', Users.getAllUsers);
router.get('/getUser/:id', Users.getUser);

module.exports = router;
