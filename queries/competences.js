var db = require("../sql/init");
var auth = require("../queries/jwt")

module.exports = {
    createCompetence: createCompetence,
    getAllCompetences: getAllCompetences,
    addCompetencesToUser: addCompetencesToUser,
    deleteCompetenceToUser : deleteCompetenceToUser
}

function existCompetence(title) {
    db.query("SELECT * FROM competences WHERE title=?", [title], function (errors, rows) {
        if (errors)
            return false;

        if (!rows.length)
            return false;
        return true;
    })
}

function createCompetence(req, res, next) {
    var title = req.body.title;

    if (!title) {
        res.status(403)
            .json({
                status: "ko",
                data: "Titre de compétence manquant"
            })
        return;
    }

    db.query("SELECT * FROM competences WHERE title=?", [title], function (errors, rows) {
        if (errors) {
            console.log("error = ", errors)
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }

        if (rows.length) {
            res.status(500)
                .json({
                    status: "ko - Already in DB"
                })
            return;
        }

        db.query("INSERT INTO competences(title) VALUES(?)", [title], function (errors, results) {
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

function getAllCompetences(req, res, next) {
    db.query("SELECT * FROM competences", function (errors, results, fields) {
        if (errors) {
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

function addCompetencesToUser(req, res, next) {
    var title = req.body.title;
    var token = req.headers.authorization;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id_user = decodedToken.data.id
            db.query("SELECT * FROM competences WHERE title=?", [title], function (errors, results, rows) {
                if (errors) {
                    res.status(500)
                        .json({
                            status: "ko"
                        })
                    return;
                }
                if (results.length == 0) {
                    db.query("INSERT INTO competences(title) VALUES(?)", [title], function (errors, results, fields) {
                        if (errors) {
                            res.status(500)
                                .json({
                                    status: "ko"
                                })
                            return;
                        }
                        db.query("SELECT * FROM competences WHERE title = ?", [title], function (errors, results, fields) {
                            if (errors) {
                                res.status(500)
                                    .json({
                                        status: "ko"
                                    })
                                return;
                            }
                            let id_competence = results[0].id;
                            db.query("INSERT INTO user_competences(id_user, id_competence) VALUES(?,?)", [id_user, id_competence], function (errors, results, fields) {
                                if (errors) {
                                    res.status(500)
                                        .json({
                                            status: "ko"
                                        })
                                }
                                res.status(200)
                                    .json({
                                        status: "ok"
                                    })
                            })
                        })
                    })
                }
                else {
                    db.query("SELECT * FROM competences WHERE title = ?", [title], function (errors, results, fields) {
                        if (errors) {
                            res.status(500)
                                .json({
                                    status: "ko"
                                })
                            return;
                        }
                        let id_competence = results[0].id;
                        db.query("INSERT INTO user_competences(id_user, id_competence) VALUES(?,?)", [id_user, id_competence], function (errors, results, fields) {
                            if (errors) {
                                res.status(500)
                                    .json({
                                        status: "ko"
                                    })
                            }
                            res.status(200)
                                .json({
                                    status: "ok"
                                })
                        })
                    })
                }
            })
        })
}

function deleteCompetenceToUser(req, res, next) {
    var id_competence = req.params.id;
    console.log(id_competence)
    db.query("DELETE FROM user_competences WHERE id = ?", [id_competence], function(errors, results, fields) {
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