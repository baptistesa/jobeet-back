var db = require("../sql/init");
var auth = require("../queries/jwt")

module.exports = {
    addMatch: addMatch,
    deleteMatch: deleteMatch,
    acceptMatch: acceptMatch,
    getUserMatch: getUserMatch,
    getRecruteurMatch: getRecruteurMatch,
}

//Add a Match
function addMatch(req, res, next) {
    var id_user = req.body.id_user;
    var id_recruteur = req.body.id_recruteur;
    var id_offre = req.body.id_offre;
    var is_valid = req.body.is_valid;
    db.query("INSERT INTO matchs(id_user, id_recruteur, id_offre, is_valid) VALUES (?, ?, ?, ?)", [id_user, id_recruteur, id_offre, is_valid], function (error, results, fields) {
        if (error) {
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        }
        else {
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })

        }
    });
}

//Delete Match
function deleteMatch(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("DELETE FROM matchs WHERE id = ?", id, function (errors, results, fields) {
        if (errors)
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

//Accept Match
function acceptMatch(req, res, next) {
    var id = req.body.id;
    db.query("UPDATE matchs SET is_valid = true WHERE id = ?", id, function (error, results, fields) {
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

//Get matchs for the user corresponding to the id parameter
function getUserMatch(req, res, next) {
    var token = req.headers.authorization;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id_user = decodedToken.data.id
            db.query("SELECT * FROM matchs WHERE id_user = ?", id_user, function (error, results, fields) {
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
        })
}

//Get matchs for the recruiter corresponding to the id parameter
function getRecruteurMatch(req, res, next) {
    var token = req.headers.authorization;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id_recruteur = decodedToken.data.id;
            db.query("SELECT * FROM matchs WHERE id_recruteur = ?", [id_recruteur], function (error, results, fields) {
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
        })
}