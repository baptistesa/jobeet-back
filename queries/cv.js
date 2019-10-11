var db = require("../sql/init");
var auth = require("../queries/jwt")


module.exports = {
    addCV: addCV,
    getCV: getCV
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
    console.log(id_user)
    db.query("SELECT * FROM CV WHERE id_user = ?", [id_user], function (error, results, fields) {
        if (error) {
            console.log(error)
            res.status(500)
                .json({
                    status: "ko"
                })
            return;
        }
        db.query("SELECT * FROM CV, FORMATIONS WHERE CV.id = ? AND CV.id = FORMATIONS.id_cv", [results[0].id], function (error2, results2, fields2) {
            if (error2) {
                console.log(error2)
                res.status(500)
                    .json({
                        status: "ko"
                    })
                return;
            }

            console.log(results2)
            res.status(200)
                .json({
                    status: "ok",
                    data: results2
                })
        })
    })
}