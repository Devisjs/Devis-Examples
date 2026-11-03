"use strict";
// Call the math microservice started by tcp/service.js.
const devis = require("devis");

devis.setName("client").connect({ host: "127.0.0.1", port: Number(process.env.PORT || 3030), id: "math", timeout: 5000 }, async () => {
    console.log("sum:", await devis.call({ clientId: "math", role: "math", cmd: "sum" }, { left: 1, right: 2 }));
    try {
        await devis.call({ clientId: "math", role: "math", cmd: "divide" }, { left: 1, right: 0 });
    } catch (err) {
        console.log("divide:", err.message);
    }
    devis.close();
});
