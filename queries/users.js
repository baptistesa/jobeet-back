var db = require("../sql/init");
var jwt = require("./jwt")
var bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    signup: signup,
    login: login
};

function getAllUsers(req, res, next) {
    db.query("SELECT * FROM users", function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        res.status(200)
            .json({
                status: "ok",
                data: results
            })
    })
}

function getUser(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM users WHERE id = ?", id, function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        res.status(200)
            .json({
                status: "ok",
                data: results
            })

    });
}

function signup(req, res, next) {
    var name = req.body.name;
    var last_name = req.body.last_name;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var password = req.body.password;
    var role = req.body.role;
    bcrypt.hash(password, 10, function (err, res2) {
        if (err)
            res.status(500)
                .json({
                    status: "ko"
                })
        else {
            password = res2;
            db.query("INSERT INTO users(name, last_name, mail, phone, password, role) VALUES(?, ?, ?, ?, ?, ?)", [name, last_name, mail, phone, password, role], function (error, results, fields) {
                if (error)
                    res.status(500)
                        .json({
                            status: "ko"
                        })
                else {
                    let token = jwt.createJWToken(req.body);
                    res.status(200)
                        .json({
                            status: "ok",
                            token: token,
                            data: req.body
                        })
                }
            });
        }
    });
}

function login(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;
    db.query("SELECT * FROM users WHERE mail = ?", mail, function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko"
                })
        else {
            bcrypt.compare(password, results[0].password, function (err, res2) {
                if (res2) {
                    let token = jwt.createJWToken(req.body);
                    res.status(200)
                        .json({
                            status: "ok",
                            token: token,
                            data: req.body
                        })
                }
                else
                    res.status(401)
                        .json({
                            status: "ko",
                            data: "Wrong password"
                        })
            });
        }
    });
}