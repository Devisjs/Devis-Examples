'use strict';
let m= require('./libs/functions');
let messages=require('devis');
messages.add({
    role: "messages",
    action: "add"
}, m.add);

messages.add({
    role: "messages",
    action: "find"
}, m.find);

messages.add({
    role: "messages",
    action: "delete"
}, m.delete);

messages.add({
    role: "messages",
    action: "update"
}, m.update);

module.exports =messages;
