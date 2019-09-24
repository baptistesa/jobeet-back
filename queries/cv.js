var db = require("../sql/init");


module.exports = {
    addCV: addCV,
    getCV: getCV,
    uploadCV: uploadCV
};

function addCV(req, res, next) {
    var id_user = req.body.id_user;
    var description = req.body.description;
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
                data: "done"
            })
    })
}

function getCV(req, res, next) {
    var id_user = req.params.id_user;
    db.query("SELECT * FROM CV where id_user = ?", id_user, function (error, results, fields) {
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
                data: results
            })
    })
}

function uploadCV(req, res, next) {
    const fs = require('fs');
    const pdf = require('pdf-parse');

    let dataBuffer = fs.readFileSync('cv.pdf');

    pdf(dataBuffer).then(function (data) {

        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);

    });


}