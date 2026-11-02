"use strict";
// Publish a message on a topic and receive it through the devis-pub_sub-redis plugin.
const devis = require("devis").plug("devis-pub_sub-redis");

const url = process.env.REDIS_URL || "redis://localhost:6379";

function call(pattern, args) {
    return new Promise((resolve, reject) => {
        devis.call(pattern, args, (err, res) => (err ? reject(err) : resolve(res)));
    });
}

async function main() {
    await call({ role: "pub", action: "create" }, { pub: "pub1", url });
    await call({ role: "sub", action: "create" }, { sub: "sub1", url });

    devis.call({ transport: "pub/sub", action: "subscribe" }, { sub: "sub1", topic: "news" }, (err, res) => {
        if (err) throw err;
        if (typeof res === "object") {
            console.log("received on " + res.topic + ":", res.message);
            process.exit(0);
        }
    });
    // Let the subscription reach Redis before publishing.
    setTimeout(() => call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "news", message: "hello" }), 100);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
