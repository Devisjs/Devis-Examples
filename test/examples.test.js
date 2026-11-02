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

function startServer(file, readyText) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [path.join(root, file)]);
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
    assert.match(await runExample("tcp/client.js"), /sum: 3/);
});

test("mongodb: inserted documents are read back", async () => {
    assert.match(await runExample("mongodb/index.js"), /books: Dune, Hyperion/);
});

test("redis: a published message reaches the subscriber", async () => {
    assert.match(await runExample("redis/index.js"), /received on news: hello/);
});

test("rabbitmq: the client gets the result computed by the remote service", async () => {
    await startServer("rabbitmq/server.js", "server launched");
    assert.match(await runExample("rabbitmq/client.js"), /sum: "?3"?/);
});
