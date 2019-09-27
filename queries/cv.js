var db = require("../sql/init");


module.exports = {
    addCV: addCV,
    getCV: getCV
};

function addCV(req, res, next) {
    var id_user = req.body.id_user;
    var description = req.body.description;
    db.query("INSERT INTO cv(id_user, description) VALUES (?, ?)", [id_user, description], function (error, results, fields) {
        if (error) {
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        res.status(200)
            .json({
                status: "ok",
                data: "done"
            })
    })
}

function getCV(req, res, next) {
    var id_user = req.params.id_user;
    db.query("SELECT * FROM CV where id_user = ?", id_user, function (error, results, fields) {
        if (error) {
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        res.status(200)
            .json({
                status: "ok",
                data: results
            })
    })
}