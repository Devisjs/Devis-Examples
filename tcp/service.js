"use strict";
// A microservice exposing its patterns over TCP.
const devis = require("devis");

devis.setName("math");

devis.push({ role: "math", cmd: "sum" }, async ({ left, right }) => left + right);

devis.push({ role: "math", cmd: "divide" }, async ({ left, right }) => {
    if (right === 0) throw new Error("division by zero");
    return left / right;
});

devis.listen({ host: "127.0.0.1", port: Number(process.env.PORT || 3030) });

process.on("SIGTERM", () => devis.close(() => process.exit(0)));
