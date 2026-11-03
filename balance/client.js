"use strict";
// Connect to two instances of the same service: Devis sends the calls to each in turn.
const devis = require("devis");

devis.setName("client").setLogger(null);
devis.connect({ id: "math-1", host: "127.0.0.1", port: 3031 });
devis.connect({ id: "math-2", host: "127.0.0.1", port: 3032 });

async function main() {
    for (let i = 0; i < 4; i++) {
        const { sum, by } = await devis.call({ role: "math", cmd: "sum" }, { left: i, right: 1 });
        console.log("sum " + sum + " by " + by);
    }
    devis.close();
}

main();
