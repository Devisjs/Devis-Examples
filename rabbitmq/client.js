"use strict";
// Call the math microservice started by rabbitmq/server.js through RabbitMQ.
const devis = require("devis").plug("devis_rabbitmq");

devis.clientMQ({ rabbitmq: { host: process.env.RABBITMQ_HOST || "localhost", port: process.env.RABBITMQ_PORT, queue: "math" } }, async (err) => {
    if (err) throw err;
    console.log("sum:", await devis.callMQ({ queue: "math", role: "math", cmd: "sum" }, { left: 1, right: 2 }));
    process.exit(0);
});
