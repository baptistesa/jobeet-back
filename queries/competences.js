var db = require("../sql/init");

module.exports = {
    existCompetence : existCompetence,
    createCompetence : createCompetence
}

function existCompetence (req, res, next) {
    var title = req.body.title;

    if (!title) {
        res.status(403)
            .json({
                status: "ko",
                data: "Titre de compétence manquant"
            })
        return;
    }

    db.query("SELECT * FROM competences WHERE title=?", [title], function(errors, rows){
        if (errors) {
            console.log("error = ", errors)
            res.status(500)
                .json({
                    status: "ko"
                })
            return false;
        }

        if (!rows.length){
            res.status(500)
                .json({
                    status: "ko - No match",
                    exist : false
                })
            return;
        }

        res.status(200)
            .json({
                status: "ok",
                result: rows[0],
                exist : true
            })
    })
}

function createCompetence (req, res, next) {
    var title = req.body.title;

    if (!title) {
        res.status(403)
            .json({
                status: "ko",
                data: "Titre de compétence manquant"
            })
        return;
    }

    db.query("SELECT * FROM competences WHERE title=?", [title], function(errors, rows){
        if (errors) {
            console.log("error = ", errors)
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }

        if (rows.length){
            res.status(500)
                .json({
                    status: "ko - Already in DB"
                })
            return;
        }

        db.query("INSERT INTO competences(title) VALUES(?)", [title], function(errors, results){
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
                    data: "Compétence ajoutée"
                })
        })
    })
}