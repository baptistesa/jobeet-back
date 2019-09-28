var db = require("../sql/init");
var jwt = require("./jwt")
var bcrypt = require('bcrypt');

const accountSid = 'ACb00cd72949c5957196b4fbfce7163954';
const authToken = '05779f22f222f35564aaed7f44334939';
const client = require('twilio')(accountSid, authToken);


module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    signup: signup,
    login: login,
    confirmCode: confirmCode
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
    var code = Math.floor(Math.random() * (100000 - 999999) + 999999);
    bcrypt.hash(password, 10, function (err, res2) {
        if (err)
            res.status(500)
                .json({
                    status: "ko"
                })
        else {
            password = res2;
            db.query("INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path) VALUES(?, ?, ?, ?, ?, ?, ?, false, 'placeholder_boy.jpg')", [name, last_name, mail, phone, password, role, code], function (error, results, fields) {
                if (error)
                    res.status(500)
                        .json({
                            status: "ko"
                        })
                else {
                    // sendSMS(code, name, phone)
                    db.query("SELECT * FROM USERS WHERE mail=? AND phone=?", [mail, phone], function (error, results, fields) {
                        let token = jwt.createJWToken(results[0]);
                        res.status(200)
                            .json({
                                status: "ok",
                                token: token,
                                data: results[0]
                            })
                    })
                }
            });
        }
    });
}

function sendSMS(code, name, phone) {
    client.messages.create({
        body: 'Bonjour ' + name + ', \nValider votre inscription en rentrant ce code : ' + code + '\nLa team Jobeet',
        to: phone,
        from: 'Jobeet'
    })
        .then((message) => {
            return;
        })
        .catch(function (err) {
            console.log('error: ' + err);
            return;
        });
    return;
}

function confirmCode(req, res, next) {
    var mail = req.body.mail;
    var code = req.body.code;
    db.query("SELECT * FROM users WHERE mail=?", mail, function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko"
                })
        else {
            if (code == results[0].code) {
                db.query("UPDATE USERS SET is_verified=true WHERE mail=?", mail, function (error, results, fields) {
                    if (error) {
                        res.status(500)
                            .json({
                                status: "ko"
                            })
                        return;
                    }
                    db.query("SELECT * FROM users WHERE mail=?", mail, function (error, results, fields) {
                        if (!error) {

                            res.status(200)
                                .json({
                                    status: "ok",
                                    data: results[0]
                                })
                        }
                    })
                })
            }
            else
                res.status(500)
                    .json({
                        status: "ko",
                        data: "Invalid code"
                    })
        }
    })
}

function login(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;
    db.query("SELECT * FROM users WHERE mail = ?", mail, function (error, results, fields) {
        if (error || results[0] == null)
            res.status(500)
                .json({
                    status: "ko",
                    data: "Wrong password"
                })
        else {
            if (!results[0].is_verified) {
                res.status(403)
                    .json({
                        status: "ko",
                        data: "Not confirmed"
                    })
                return;
            }
            bcrypt.compare(password, results[0].password, function (err, res2) {
                if (res2) {
                    let token = jwt.createJWToken(results[0]);
                    res.status(200)
                        .json({
                            status: "ok",
                            token: token,
                            data: results[0]
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