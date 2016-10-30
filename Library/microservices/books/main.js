"use strict";
let b = require('./libs/functions');
let book = require('devis');

book.add({
    role: "books",
    action: "add"
}, b.add);

book.add({
    role: "books",
    action: "find"
}, b.find);

book.add({
    role: "books",
    action: "delete"
}, b.delete);

book.add({
    role: "books",
    action: "update"
}, b.update);

module.exports = book;
