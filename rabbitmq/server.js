"use strict";
// A microservice answering calls received through RabbitMQ.
const devis = require("devis").plug("devis_rabbitmq");

devis.push({ role: "math", cmd: "sum" }, (args, done) => {
    done(null, args.left + args.right);
});

devis.listenMQ({ rabbitmq: { host: process.env.RABBITMQ_HOST || "localhost", port: process.env.RABBITMQ_PORT, queue: "math" } }, (err) => {
    if (err) throw err;
});
