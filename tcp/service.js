"use strict";
// A microservice exposing its patterns over TCP.
const devis = require("devis");

devis.setName("math");

devis.push({ role: "math", cmd: "sum" }, (args, done) => {
    done(null, args.left + args.right);
});

devis.listen({ host: "127.0.0.1", port: Number(process.env.PORT || 3030) });
