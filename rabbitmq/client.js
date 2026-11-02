"use strict";
// Call the math microservice started by rabbitmq/server.js through RabbitMQ.
const devis = require("devis").plug("devis_rabbitmq");

devis.clientMQ({ rabbitmq: { host: process.env.RABBITMQ_HOST || "localhost", port: process.env.RABBITMQ_PORT, queue: "math" } }, (err) => {
    if (err) throw err;
    devis.callMQ({ queue: "math", role: "math", cmd: "sum" }, { left: 1, right: 2 }, (err, result) => {
        if (err) throw err;
        console.log("sum:", result);
        process.exit(0);
    });
});
