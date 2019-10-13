var db = require("../sql/init");

module.exports = {
    runAlgo : runAlgo
}

// Run algo matching
function runAlgo(req, res, next) {
    var offres = [];
    var users = [];
    db.query("SELECT * FROM offre_competences", function(errors, results, fields) {
        if (errors) {
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