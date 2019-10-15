var db = require("../sql/init");

module.exports = {
    runAlgo: runAlgo
}

// Run algo matching
function runAlgo(req, res, next) {
    var offres = [];
    var users = [];
    db.query("SELECT * FROM offres c INNER JOIN offre_competences o ON c.id = o.id_offre", function (errors, results, fields) {
        if (errors) {
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        offres = results;
        db.query("SELECT * FROM user_competences", function (errors, results, fields) {
            if (errors) {
                res.status(500)
                    .json({
                        status: "ko"
                    })
                return;
            }
            users = results;

            res.status(200)
                .json({
                    status : "ok",
                    users : users,
                    offres : offres
                })
        })
    })
}