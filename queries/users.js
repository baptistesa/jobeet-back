var db = require("../sql/init");

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser
};

function getAllUsers(req, res, next) {
    res.status(200)
        .json({
            status: "ok",
            message: "Hello lovelace"
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