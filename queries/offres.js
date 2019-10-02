var db = require("../sql/init");

module.exports = {
    getOffre: getOffre,
    getOffres:getOffres
};

function getOffre(req, res, next){
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM offres WHERE id = ?", id, function (error, results, fields) {
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
}

function getOffres(req, res, next){
    var start = parseInt(req.params.start);
    var end = parseInt(req.params.end);
    db.query("SELECT * FROM offres LIMIT ? OFFSET ?", [end, start], function (error, results, fields) {
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
}