"use strict";
const user = require('../../../app/database/mongo/models/user.js');
const devis = require("devis");

function add(args, done) {
    devis.act({
        role: "crypto",
        action: "hash"
    }, {
        data: args.data.password
    }, (err, hash) => {
        args.data.password = hash;
        devis.act({
            role: "mongo",
            action: "insert"
        }, {
            Schema: user,
            data: args.data
        }, (err, res) => {

            done(err, res);
        });
    });
}

function delet(args, done) {
    devis.act({
        role: "mongo",
        action: "delete"
    }, {
        Schema: user,
        conditions: args.login
    }, (err, res) => {
        done(err, res);
    });
}

function update(args, done) {
    if (args.data.password) {
        devis.act({
            role: "crypto",
            action: "hash"
        }, {
            data: args.data.password
        }, (err, hash) => {
            args.data.password = hash;
            devis.act({
                role: "mongo",
                action: "update"
            }, {
                Schema: user,
                id: args.id,
                update: args.data
            }, (err, res) => {
                done(err, res);
            });
        });
    } else {
        devis.act({
            role: "mongo",
            action: "update"
        }, {
            Schema: user,
            id: args.id,
            update: args.data
        }, (err, res) => {
            done(err, res);
        });
    }
}

function find(args, done) {
    let login = {};
    if (args.login) login = {
        login: args.login
    };
    devis.act({
        role: "mongo",
        action: "find"
    }, {
        conditions: login,
        Schema: user
    }, function(err, res) {
        done(err, res);
    });
}

function login(args, done) {
    let error;
    let final = {};
    find({
        login: args.login
    }, (err, result) => {
        if (err) error = err;
        if (!error) {
            devis.act({
                role: "crypto",
                action: "hash"
            }, {
                data: args.password
            }, (err, res) => {
                if (res == result[0].password) {
                    final.user = result[0];
                    final.message = "login success!";
                } else {
                    final.user = null;
                    final.message = "error incorrect password";
                }
                done(err, final);
            });
        } else done(error, "");
    });
}

function logout(args, done) {

}

module.exports = {
    add: add,
    delete: delet,
    update: update,
    find: find,
    login: login,
    logout: logout
}
