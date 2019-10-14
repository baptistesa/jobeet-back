var db = require("../sql/init");

module.exports = {
    getOffre: getOffre,
    getOffres: getOffres,
    addOffre: addOffre,
    deleteOffre: deleteOffre,
    getCount: getCount,
    getCompetencesById : getCompetencesById
};

/* Returns the offer corresponding to the 'id' parameter */
function getOffre(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM offres WHERE id = ?", id, function (error, results, fields) {
        if (errors) {
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
            console.log(errors)
        }
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results[0]
                })
    });
}

/* Returns all offers with pages */
function getOffres(req, res, next) {
    var start = parseInt(req.params.start);
    var end = parseInt(req.params.end);
    db.query("SELECT * FROM offres", function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
            return;
        }
        res.status(200)
            .json({
                status: "ok",
                data: results
            })
    });
}

/* Adds an offer contained in the request body */
function addOffre(req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var id_author = req.body.id_author;
    var date = req.body.date;
    var id_entreprise = req.body.id_entreprise;

    db.query("INSERT INTO offres VALUES(?, ?, ?, ?, ?, ?)", [id, title, description, id_author, date, id_entreprise], function (errors, results, fields) {
        if (errors) {
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
            console.log(errors);
        }
        else {
            db.query("SELECT * FROM offres WHERE title = ? AND description = ?", [title, description], function (errors, results, fields) {
                res.status(200)
                    .json({
                        status: "ok",
                        data: results
                    })
            })
        }
    });
}

/* Deletes the offer corresponding to the id parameter */
function deleteOffre(req, res, next) {
    var id = parseInt(req.params.id);

    db.query("DELETE FROM offres WHERE id = ?", id, function (errors, results, fields) {
        if (errors)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        res.status(200)
            .json({
                status: "ok",
                data: results[0]
            })
    });
}

/* Returns the total number of offers */
function getCount(req, res, next) {
    db.query("SELECT COUNT(*) FROM offres", function (errors, results, fields) {
        if (errors)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        res.status(200)
            .json({
                status: "ok",
                data: results[0]
            })
    });
}

// Get competences by offre id
function getCompetencesById(req, res, next) {
    var offre_id = req.params.offre_id;
    db.query("SELECT * FROM offre_competences, competences WHERE offre_competences.id_offre = ? AND offre_competences.id_competence = competences.id", [offre_id], function(errors, results, fields) {
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
                status : "ok",
                data : results
            })
    })
}