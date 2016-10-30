'use strict'
let mongoose = require('mongoose');
let Schema = new mongoose.Schema({
    "title": {
        "type": "String",
        "unique": "true",
        "required": "true"
    },
    "summary": {
        "type": "String",
        "unique": "true",
        "required": "true"
    },
    "borrowed": "Number",
    "quantity": "Number",
    "picture": "String",
    "users": "Object",
    "updated_at": {
        "type": Date,
        "default": Date.now
    }
});
module.exports = mongoose.model("book", Schema);
