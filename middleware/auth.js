var auth = require("../queries/jwt")

module.exports = {
    verifyUser: verifyUser
}

function verifyUser(req, res, next) {
    var token = req.headers.authorization;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            req.user = decodedToken.data
            next()
        })
        .catch((err) => {
            res.status(400)
                .json({
                    status : "ko",
                    message: "Invalid token."
                })
        })

}