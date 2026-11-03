"use strict";
// One instance of the math microservice; start several on different ports.
const devis = require("devis");

const port = Number(process.env.PORT || 3031);

devis.setName("math-" + port);

devis.push({ role: "math", cmd: "sum" }, async ({ left, right }) => ({ sum: left + right, by: port }));

devis.listen({ host: "127.0.0.1", port });

process.on("SIGTERM", () => devis.close(() => process.exit(0)));
