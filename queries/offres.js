var db = require("../sql/init");

module.exports = {
    getOffre: getOffre,
    getOffres:getOffres
};

/* Returns the offer corresponding to the 'id' parameter */
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
                data: results[0]
            })
    });
}

/* Returns all offers with pages */
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
                data: results[0]
            })
    });
}

/* Adds an offer contained in the request body */
function addOffre(req, res, next){
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var id_author = req.body.id_author;
    var date = req.body.date;

    db.query("INSERT INTO offres VALUES(?, ?, ?, ?, ?)", [id, title, description, id_author, date], function(errors, results, fields) {
        if (error)
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