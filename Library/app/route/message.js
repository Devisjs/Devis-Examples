'use strict';
const colors = require("colors/safe");

let devis;


function POST(req, res) {
    req.body = JSON.stringify(req.body);
    devis.act({
        clientId: 1,
        role: "messages",
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
        role: "messages",
        action: "delete"
    }, {
        login: req.param.id
    }, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}

function GET(req, res) {
    let ID = "";
    if (req.params.id) ID = req.params.id;
    devis.act({
        clientId: 1,
        role: "messages",
        action: "find"
    }, {
        who: req.query.who,
        login: ID
    }, function(err, result) {
        if (err) result = "no message";
        res.json(result);

    });
}

function PUT(req, res) {
    let id = req.body._id;
    req.body = JSON.stringify(req.body);
    devis.act({
        clientId: 1,
        role: "messages",
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
