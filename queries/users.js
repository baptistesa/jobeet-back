var db = require("../sql/init");

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser
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
    db.query("SELECT * FROM users where id = ?", id, function (error, results, fields) {
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

function addUser(req, res, next) {
    var name = req.body.name;
    var last_name = req.body.last_name;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var password = req.body.password;
}