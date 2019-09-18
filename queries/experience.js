var db = require("../sql/init");

module.exports = {
    addExperience : addExperience
}

function addExperience(req, res, next) {
    var company = req.body.company;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;

    db.query("INSERT INTO experience VALUES(?, ?, ?, ?)", [company, description, start_date, end_date], function(errors, results, fields) {

    })
}