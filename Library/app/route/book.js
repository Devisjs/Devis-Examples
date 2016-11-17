'use strict';
const colors = require("colors/safe");
const path = require('path'),
    fs = require('fs');
let devis;

function POST(req, res) {

    req.body.picture = req.file.originalname;
    req.body = JSON.stringify(req.body);
    devis.act({
        clientId: 1,
        role: "books",
        action: "add"
    }, {
        data: req.body
    }, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

function DELETE(req, res) {
    devis.act({
        clientId: 1,
        role: "books",
        action: "delete"
    }, {
        login: req.param.id
    }, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}

function GET(req, res) {
    if (req.header('Referer').search("/book/") != '-1' && req.session.role != 'admin') {
            req.session.destroy();
    } else {
        let ID = "";
        if (req.params && req.params.id) ID = req.params.id;
        devis.act({
            clientId: 1,
            role: "books",
            action: "find"
        }, {
            login: ID
        }, function(err, result) {
            if (err) console.log(err);

            res.json(result);

        });
    }

}

function PUT(req, res) {
    if (req.file)
        req.body.picture = req.file.originalname;
    let id = req.body._id;
    req.body = JSON.stringify(req.body);
    devis.act({
        clientId: 1,
        role: "books",
        action: "update"
    }, {
        id: id,
        data: req.body
    }, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

module.exports = function route(r) {
    devis = r.devis;
    return {
        GET: GET,
        POST: POST,
        PUT: PUT,
        DELETE: DELETE
    }
}
