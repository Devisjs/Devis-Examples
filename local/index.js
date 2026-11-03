"use strict";
// Register a pattern and call it in the same process.
const devis = require("devis");

devis.push({ role: "math", cmd: "sum" }, async ({ left, right }) => left + right);

devis.call({ role: "math", cmd: "sum" }, { left: 1, right: 2 }).then((result) => {
    console.log("sum:", result);
});
