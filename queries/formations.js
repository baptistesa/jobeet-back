var db = require("../sql/init");

module.exports = {
    addFormation: addFormation
};

function addFormation(req, res, next) {
    var school = req.body.school;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var cv_id = req.body.cv_id;

    if (!school) {
        res.status(403)
           .json({
               status: "ko",
               data: "Établissement manquant"
           })
        return;
    }

    if (!start_date){
        res.status(403)
            .json({
                status: "ko",
                data: "Date de début manquante"
            })
        return;
    }

    if (!end_date){
        res.status(403)
            .json({
                status: "ko",
                data: "Date de fin manquante"
            })
        return;
    }

    if (!cv_id){
        res.status(403)
            .json({
                status: "ko",
                data: "ID de CV manquant"
            })
        return;
    }

    db.query("INSERT INTO formations VALUES(?, ?, ?, ?, ?)", [school, start_date, end_date, description, cv_id], function (error, results, fields) {
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
               data: "Formation ajoutée"
           })
    })
        .catch((err) => {
            res.status(401)
                .json({
                    status: "ko",
                    message: err
                })
            return;
        })
}