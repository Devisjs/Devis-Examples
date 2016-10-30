"use strict";
const devis = require("devis");
const book = require('../../../app/database/mongo/models/book.js');



function add(args, done) {
    args.data = JSON.parse(args.data);
    devis.act({
        role: "mongo",
        action: "insert"
    }, {
        Schema: book,
        data: args.data
    }, (err, res) => {
        done(err, res);
    });
}

function delet(args, done) {
    devis.act({
        role: "mongo",
        action: "delete"
    }, {
        Schema: book,
        conditions: args.name
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
        Schema: book,
        id: args.id,
        update: args.data
    }, (err, res) => {
        done(err, res);
    });
}

function find(args, done) {
    let title = {};
    if (args.title) title = {
        title: args.title
    };
    devis.act({
        role: "mongo",
        action: "find"
    }, {
        conditions: title,
        Schema: book
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
