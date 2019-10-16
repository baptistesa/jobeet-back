var db = require("../sql/init");
var auth = require("../queries/jwt")

module.exports = {
    getEntreprises: getEntreprises,
    getEntreprise: getEntreprise,
    addEntreprise: addEntreprise,
    getCount: getCount,
    getEmployees: getEmployees,
    getEntrepriseOffres: getEntrepriseOffres,
    deleteEntreprise: deleteEntreprise,
    updateDescription: updateDescription
}

// Return all entreprises
function getEntreprises(req, res, next) {
    db.query("SELECT * FROM entreprises", function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })
    })
}

// Return the entreprise corresponding to the id parameter
function getEntreprise(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM entreprises WHERE id = ?", id, function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })

    });
}

// Return employees of the entreprise corresponding to the id parameter
function getEmployees(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM users WHERE id_entreprise = ?", id, function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })
    });
}

//Return offers of the entreprise corresponding to the id parameter
function getEntrepriseOffres(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM offres WHERE id_entreprise = ?", id, function (error, results, fields) {
        if (error)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })
    });
}

// Add an entreprise to the entreprises table
function addEntreprise(req, res, next) {
    var name = req.body.name;
    var description = req.body.description;
    db.query("INSERT INTO entreprises(name, description, picture_path) VALUES(?, ?, 'placeholder_company.png')", [name, description], function (error, results, fields) {
        if (error) {
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        }
        else {
            db.query("SELECT * FROM entreprises WHERE name= ?", [name], function (errors, results, fields) {
                res.status(200)
                    .json({
                        status: "ok",
                        data: results
                    })

            })
        }

    });
}

// Get the total number of entreprises
function getCount(req, res, next) {
    db.query("SELECT COUNT(*) FROM entreprises", function (errors, results, fields) {
        if (errors) {
            console.log(errors)
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
        }
        res.status(200)
            .json({
                status: "ok",
                data: results[0]
            })
    });
}

/* Deletes the entreprise corresponding to the id parameter */
function deleteEntreprise(req, res, next) {
    var id = parseInt(req.params.id);
    db.query("DELETE FROM entreprises WHERE id = ?", id, function (errors, results, fields) {
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

function updateDescription(req, res, next) {
    var token = req.headers.authorization;
    var description = req.body.description;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id = decodedToken.data.id_entreprise;
            db.query("UPDATE entreprises SET description = ? WHERE id = ?", [description, id], function (error, results, fields) {
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
                        data: "CV updated"
                    })
            })
        })
}