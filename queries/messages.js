var db = require("../sql/init");
var auth = require("../queries/jwt")

module.exports = {
    getMessages: getMessages,
    addMessage : addMessage
}

function addMessage(req, res, next) {
    var id_user = req.body.id_user;
    var id_offre = req.body.id_offre;
    var message = req.body.message;
    var id_recruteur = req.body.id_recruteur;
    var id_room = req.body.id_room;

    auth.verifyJWTToken(token)
        .then(decodedToken => {
            var id_token = decodedToken.data.id;
            if (id_token != id_user && id_token != id_recruteur) {
                res.status(403)
                    .json({
                        status: "ko",
                        message: "Don't do that"
                    })
            }
            db.query("INSERT INTO messages(id_user, id_offre, message, id_recruteur, id_room) VALUES(?, ?, ?, ?, ?)", [id_user, id_offre, message, id_recruteur, id_room], function (errors, results, fields) {
                if (errors) {
                    res.status(500)
                        .json({
                            status: "ko"
                        })
                    return;
                }
                res.status(200)
                    .json({
                        status : "ok"
                    })
            })

        })
}

function getMessages(req, res, next) {
    var id_room = req.params.id_room;
    var token = req.headers.authorization;

    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id_user = decodedToken.data.id
            db.query("SELECT * FROM messages WHERE id_room = ? AND (id_recruteur = ? OR id_user = ?)", [id_room, id_user], function (errors, results, fields) {
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
        })
}