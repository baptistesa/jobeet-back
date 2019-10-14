'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pascal08/10/1970',
    database: 'jobeet'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;