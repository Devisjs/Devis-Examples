"use strict";
let c = require('./libs/functions');
let crypto = require('devis');

crypto.add({
    role: "crypto",
    action: "hash"
}, c.hash);

module.exports = crypto;
