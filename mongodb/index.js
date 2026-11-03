"use strict";
// Store and read documents through the devis-mongo-client plugin.
const devis = require("devis").plug("devis-mongo-client");

const url = process.env.MONGO_URL || "mongodb://localhost:27017/devis_examples";

function call(action, args) {
    return devis.call({ role: "mongodb", action }, args);
}

async function main() {
    await call("connect", { url });
    await call("delete", { collection: "books", type: "many", query: {}, close: false });
    await call("insert", { collection: "books", type: "many", data: [{ title: "Dune" }, { title: "Hyperion" }], close: false });
    const books = await call("find", { collection: "books", query: {}, options: { projection: { _id: 0 }, sort: { title: 1 } } });
    console.log("books:", books.map((book) => book.title).join(", "));
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
