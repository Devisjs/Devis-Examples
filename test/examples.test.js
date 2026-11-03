"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { spawn, execFile } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");
const servers = [];

function runExample(file) {
    return new Promise((resolve, reject) => {
        execFile(process.execPath, [path.join(root, file)], { timeout: 15000 }, (err, stdout, stderr) => {
            if (err) reject(new Error(file + " failed: " + stderr));
            else resolve(stdout);
        });
    });
}

function startServer(file, readyText, env) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [path.join(root, file)], { env: Object.assign({}, process.env, env) });
        servers.push(child);
        child.stdout.on("data", (data) => {
            if (data.toString().includes(readyText)) resolve();
        });
        child.on("exit", (code) => reject(new Error(file + " exited with code " + code)));
    });
}

test.after(() => servers.forEach((child) => child.kill()));

test("local: a pattern is called in the same process", async () => {
    assert.match(await runExample("local/index.js"), /sum: 3/);
});

test("tcp: the client gets the result computed by the remote service", async () => {
    await startServer("tcp/service.js", "server launched");
    const out = await runExample("tcp/client.js");
    assert.match(out, /sum: 3/);
    // A remote error must reach the caller as a rejected call, not crash either process.
    assert.match(out, /divide: division by zero/);
});

// Load balancing is the point of running several instances: both must receive calls.
test("balance: calls alternate between two instances of a service", async () => {
    await startServer("balance/service.js", "server launched", { PORT: "3031" });
    await startServer("balance/service.js", "server launched", { PORT: "3032" });
    const out = await runExample("balance/client.js");
    assert.match(out, /sum 1 by 3031\nsum 2 by 3032\nsum 3 by 3031\nsum 4 by 3032/);
});

test("mongodb: inserted documents are read back", async () => {
    assert.match(await runExample("mongodb/index.js"), /books: Dune, Hyperion/);
});

test("redis: a published message reaches the subscriber", async () => {
    assert.match(await runExample("redis/index.js"), /received on news: hello/);
});

test("rabbitmq: the client gets the result computed by the remote service", async () => {
    await startServer("rabbitmq/server.js", "server launched");
    assert.match(await runExample("rabbitmq/client.js"), /sum: 3/);
});
