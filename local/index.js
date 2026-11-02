"use strict";
// Register a pattern and call it in the same process.
const devis = require("devis");

devis.push({ role: "math", cmd: "sum" }, (args, done) => {
    done(null, args.left + args.right);
});

devis.call({ role: "math", cmd: "sum" }, { left: 1, right: 2 }, (err, result) => {
    if (err) throw err;
    console.log("sum:", result);
});
