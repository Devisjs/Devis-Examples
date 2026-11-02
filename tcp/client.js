"use strict";
// Call the math microservice started by tcp/service.js.
const devis = require("devis");

devis.setName("client").connect({ host: "127.0.0.1", port: Number(process.env.PORT || 3030), id: 0 }, () => {
    devis.call({ clientId: 0, role: "math", cmd: "sum" }, { left: 1, right: 2 }, (err, result) => {
        if (err) throw err;
        console.log("sum:", result);
        devis.close(0);
    });
});
