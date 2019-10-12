var db = require("../sql/init");

module.exports = {
    addExperience : addExperience,
    removeExperience : removeExperience
}

function addExperience(req, res, next) {
    var company = req.body.company;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var cv_id = req.body.cv_id;

    if (!company) {
        res.status(403)
            .json({
                status: "ko",
                data: "Entreprise manquante"
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

    db.query("INSERT INTO experience(id_cv, company, description, start_date, end_date) VALUES(?, ?, ?, ?, ?)", [cv_id, company, description, start_date, end_date], function(errors, results, fields) {
        if (errors) {
            console.log("error = ", errors)
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        res.status(200)
            .json({
                status: "ok",
                data: "Expérience ajoutée"
            })
    })
}

function removeExperience(req, res, next){
    var id = req.body.id;

    if (!id){
        res.status(403)
            .json({
                status: "ko",
                data: "ID manquant"
            })
        return;
    }

    db.query("DELETE FROM experience WHERE id=?", [id], function (errors, results, fields) {
        if (errors) {
            console.log("error = ", errors)
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        res.status(200)
            .json({
                status: "ok",
                data: "Expérience supprimée"
            })
    })
}
