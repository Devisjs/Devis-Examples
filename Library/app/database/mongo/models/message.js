'use strict'
let mongoose = require('mongoose');
let Schema = new mongoose.Schema({
    "title": "String",
    "subject": "String",
    "text": "String",
    "sender": "String",
    "receiver": "String",
    "delete": "Object",
    "updated_at": {
        "type": Date,
        "default": Date.now
    }
});
module.exports = mongoose.model("message", Schema);
