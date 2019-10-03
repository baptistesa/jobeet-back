var db = require("../sql/init");

module.exports = {
    getEntreprises: getEntreprises,
    getEntreprise: getEntreprise,
    addEntreprise: addEntreprise,
    getCount: getCount,
    //getEmployees: getEmployees,
    //getEmployeeEntreprise: getEmployeeEntreprise,
    //addUserEntreprise: addUserEntreprise,
    deleteEntreprise: deleteEntreprise
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

// Add an entreprise to the entreprises table
function addEntreprise(req, res, next) {
    var name = req.body.name;
    var description = req.body.description;
    db.query("INSERT INTO entreprises(name, description) VALUES(?, ?)", [name, description], function (error, results, fields) {
        if (error) {
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
            }
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })
    });
}

// Get the total number of entreprises
function getCount(req, res, next){
    db.query("SELECT COUNT(*) FROM entreprises", function(errors, results, fields) {
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
function deleteEntreprise(req, res, next){
    var id = parseInt(req.params.id);
    db.query("DELETE FROM entreprises WHERE id = ?", id, function(errors, results, fields) {
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