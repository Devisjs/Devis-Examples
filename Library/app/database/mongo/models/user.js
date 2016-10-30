'use strict'
let mongoose = require('mongoose');
let Schema = new mongoose.Schema({
    "firstname": {
        "type": "String",
        "unique": true,
        "required": "true"
    },
    "lastname": {
        "type": "String",
        "required": true
    },
    "login": {
        "type": "String",
        "unique": true,
        "required": true
    },
    "email": {
        "type": "String",
        "required": true
    },
    "password": {
        "type": "String",
        "required": true
    },
    "admin": {
        "type": "Boolean",
        "required": true
    },
    "updated_at": {
        "type": Date,
        "default": Date.now
    }
});
module.exports = mongoose.model("user", Schema);
