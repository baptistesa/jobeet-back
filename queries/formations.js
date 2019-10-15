var db = require("../sql/init");

module.exports = {
    addFormation: addFormation,
    deleteFormation : deleteFormation
};

function addFormation(req, res, next) {
    var school = req.body.school;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var cv_id = req.body.cv_id;
    var title = req.body.title;

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

    if (!cv_id){
        res.status(403)
            .json({
                status: "ko",
                data: "ID de CV manquant"
            })
        return;
    }

    db.query("INSERT INTO formations(title, school, start_date, end_date, description, id_cv) VALUES(?, ?, ?, ?, ?, ?)", [title, school, start_date, end_date, description, cv_id], function (error, results, fields) {
        if (error) {
            console.log("error = ", error)
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
}

function deleteFormation(req, res, next) {
    var id_formation = parseInt(req.params.id_formation);
    console.log(id_formation)
    db.query("DELETE FROM formations WHERE formations.id = ?", [id_formation], function (errors, results, fields) {
        if (errors) {
            console.log(errors)
            res.status(500)
                .json({
                    status : "ko"
                })
            return;
        }
        res.status(200)
            .json({
                status : "ok"
            })
    })
}