"use strict";
const devis = require("devis");
const message = require('../../../app/database/mongo/models/message.js');

function add(args, done) {
    args.data = JSON.parse(args.data);
    devis.act({
        role: "mongo",
        action: "insert"
    }, {
        Schema: message,
        data: args.data
    }, (err, res) => {
        done(err, res);
    });
}

function update(args, done) {
    args.data = JSON.parse(args.data);
    
    devis.act({
        role: "mongo",
        action: "update"
    }, {
        Schema: message,
        id: args.id,
        update: args.data
    }, (err, res) => {
        done(err, res);
    });
}

function delet(args, done) {
    devis.act({
        role: "mongo",
        action: "delete"
    }, {
        Schema: message,
        conditions: args.name
    }, (err, res) => {
        done(err, res);
    });
}

function find(args, done) {
    let who = {};
    if (args.login) {
        if (args.who == "sender")
            who = {
                sender: args.login
            }
        else who = {
            receiver: args.login
        }
    }
    devis.act({
        role: "mongo",
        action: "find"
    }, {
        conditions: who,
        Schema: message
    }, function(err, res) {
        done(err, res);
    });
}
module.exports = {
    add: add,
    delete: delet,
    update: update,
    find: find
}
