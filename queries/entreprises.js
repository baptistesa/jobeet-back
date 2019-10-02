var db = require("../sql/init");

module.exports = {
    getEntreprises: getEntreprises,
    getEntreprise: getEntreprise,
    addEntreprise: addEntreprise,
    //getCount: getCount,
    //getEmployees: getEmployees,
    //getEmployeeEntreprise: getEmployeeEntreprise,
    //addUserEntreprise: addUserEntreprise,
    //deleteEntreprise: deleteEntreprise
}

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

function addEntreprise(req, res, next) {
    var name = req.body.name;
    var description = req.body.description;
    console.log(name, description);
    db.query("INSERT INTO entreprises(name, description) VALUES(?, ?)", [name, description], function (error, results, fields) {
        if (error) {
            res.status(500)
                .json({
                    status: "ko",
                    data: "error"
                })
            console.log(error);
            }
        else
            res.status(200)
                .json({
                    status: "ok",
                    data: results
                })
    });
}