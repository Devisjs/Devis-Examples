'use strict';
const colors = require("colors/safe");

let devis;

function LOGIN(req, res) {
    devis.act({
        clientId: 1,
        role: "users",
        action: "login"
    }, {
        login: req.body.login,
        password: req.body.password
    }, (err, result) => {
        if (err) result.message = "error incorrect login";
        if (result.message == "login success!") {
            req.session.user = req.body.login;
            if (result.user.admin)
                req.session.role = 'admin';
            else req.session.role = 'normal';
        }
        res.send(result.message);
    });
}

function LOGOUT(req, res) {
    req.session.destroy();
    if(!req.session)
    res.sendStatus(401);
}

function POST(req, res) {
    devis.act({
        clientId: 1,
        role: "users",
        action: "add"
    }, {
        data: req.body
    }, (err, result) => {

        if (err) console.log(err);
        res.json(result);
    });
}

function DELETE(req, res) {
    devis.act({
        clientId: 1,
        role: "users",
        action: "delete"
    }, {
        login: req.param.id
    }, function(err, result) {
        if (err) console.log(err);
        res.json(result);
    });
}

function GET(req, res) {
    if (req.header('Referer').search("/user/") != '-1' && req.session.role != 'admin') {
        req.session.destroy();
    } else {

        let ID = "";
        if (req.params.id) ID = req.params.id;
        devis.act({
            clientId: 1,
            role: "users",
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
    devis.act({
        clientId: 1,
        role: "users",
        action: "update"
    }, {
        id: req.body._id,
        data: req.body
    }, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
}

module.exports = function route(r) {
    devis = r.devis;
    return {
        GET: GET,
        POST: POST,
        PUT: PUT,
        DELETE: DELETE,
        LOGIN: LOGIN,
        LOGOUT: LOGOUT
    }
}
