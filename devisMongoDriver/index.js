"use strict";
let mongoDriver = require("devis");
let mongofunctions = require("./libs/functions");

mongoDriver.add({
    role: "mongodb",
    action: "connect"
}, mongofunctions.connect);


mongoDriver.add({
    role: "mongodb",
    action: "index"
}, mongofunctions.index);

mongoDriver.add({
    role: "mongodb",
    action: "close"
}, mongofunctions.close);

mongoDriver.add({
    role: "mongodb",
    action: "insert"
}, mongofunctions.insert);

mongoDriver.add({
    role: "mongodb",
    action: "find"
}, mongofunctions.find);

mongoDriver.add({
    role: "mongodb",
    action: "aggregate"
}, mongofunctions.aggregate);

mongoDriver.add({
    role: "mongodb",
    action: "update"
}, mongofunctions.update);

mongoDriver.add({
    role: "mongodb",
    action: "delete"
}, mongofunctions.del);

mongoDriver.add({
    role: "mongodb",
    action: "dropCollection"
}, mongofunctions.dropCollection);

mongoDriver.add({
    role: "mongodb",
    action: "createCollection"
}, mongofunctions.createCollection);

module.exports = mongoDriver;//for local use

//using protocoles
//unix socket:
/*
mongoDriver.listen({
    path:"/tmp/mongodb.sock"
});
*/ 

//named pipes:

/*
mongoDriver.listen({path: "\\\\\.\\pipe\\mongodb"});
*/

//tcp:
/*
mongoDriver.listen({host: "127.0.0.1" port : 3030, type:"tcp"});
*/

//http:
/*
mongoDriver.listen({host: "127.0.0.1" port : 3030, type:"http"});
*/