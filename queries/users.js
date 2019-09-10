var db = require("../sql/init");

module.exports = {
    getAllUsers: getAllUsers
};

function getAllUsers(req, res, next) {
    res.status(200)
       .json({
           status : "ok",
           message : "Hello lovelace"
       })
}