var db = require("../sql/init");
var auth = require("../queries/jwt")


module.exports = {
    addCV: addCV,
    getCV: getCV,
    modifyCV: modifyCV
};

function addCV(req, res, next) {
    var token = req.headers.authorization;
    var description = req.body.description;
    if (!description) {
        res.status(403)
            .json({
                status: "ko",
                data: "Description manquante"
            })
        return;
    }
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id_user = decodedToken.data.id
            db.query("INSERT INTO cv(id_user, description) VALUES (?, ?)", [id_user, description], function (error, results, fields) {
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
                        data: "CV added"
                    })
            })
        })
        .catch((err) => {
            res.status(401)
                .json({
                    status: "ko",
                    message: err
                })
            return;
        })
}

function getCV(req, res, next) {
    var id_user = req.params.id_user;
    db.query("SELECT * FROM cv WHERE id_user = ?", [id_user], function (error, results, fields) {
        if (error) {
            console.log("error 1 = ", error)
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        db.query("SELECT * FROM formations WHERE formations.id_cv = ?", [results[0].id], function (error2, formations, fields2) {
            if (error2) {
                console.log("error 2 = ", error2)
                res.status(500)
                    .json({
                        status: "ko"
                    })
                return;
            }
            db.query("SELECT * FROM experience WHERE experience.id_cv = ?", [results[0].id], function (error3, experiences, fields2) {
                if (error3) {
                    console.log("error 3 = ", error3)
                    res.status(500)
                        .json({
                            status: "ko"
                        })
                    return;
                }
                res.status(200)
                    .json({
                        status: "ok",
                        cv: results[0],
                        formations: formations,
                        experiences: experiences
                    })
            })
        })
    })
}

function modifyCV(req, res, next) {
    var token = req.headers.authorization;
    var description = req.body.description;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            var id_user = decodedToken.data.id
            db.query("UPDATE cv SET description = ? WHERE id_user = ?", [description, id_user], function (error, results, fields) {
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
        .catch((err) => {
            res.status(401)
                .json({
                    status: "ko",
                    message: err
                })
            return;
        })
}