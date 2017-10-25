"use struct";

let mongoClient = require("mongodb").MongoClient;
let database;

function connect(args, done) {
    mongoClient.connect(args.url, (err, db) => {
        database = db;
        done(err, db);
    });
}

function find(args, done) {
    if (args.type === undefined) args.type = "many";
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    let options = [
        {
            type: "one", function: () => {
                col.findOne(args.query, args.options, (err, result) => {
                    done(err, result);
                });
            }
        },
        {
            type: "many", function: () => {
                col.find(args.query, args.options).toArray((err, items) => {
                    done(err, items);
                });
            }
        }
    ];
    options.forEach((obj) => {
        if (obj.type === args.type) {
            obj.function();
            if (args.close === undefined || args.close === true) {
                args.db.close();
            }
        }
    });
}

function close(args, done) {
    if (args.db === undefined) {
        args.db = database;
    }
    try {
        args.db.close();
        done(null, "end connection");
    }
    catch (e) {
        done(e, null);
    }
}

function index(args, done) {
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    let options = [
        {
            type: "ensureIndex", function: () => {
                col.ensureIndex(args.indexFields, args.params, (err, indexName) => {
                    done(err, indexName);
                });
            }
        },
        {
            type: "createIndex", function: () => {
                col.createIndex(args.indexFields, args.params, (err, indexName) => {
                    done(err, indexName);
                });
            }
        },
        {
            type: "ifExist", function: () => {
                col.indexExists(args.index, (err, booleanResult) => {
                    done(err, booleanResult);
                });
            }
        },
        {
            type: "getAllIndexes", function: () => {
                col.indexes((err, indexes) => {
                    done(err, indexes);
                });
            }
        }
    ];
    options.forEach((obj) => {
        if (obj.type === args.type) {
            obj.function();
            if (args.close === undefined || args.close === true) {
                args.db.close();
            }
        }
    });
}

function insert(args, done) {
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    if (args.type === "one") {
        col.insertOne(args.data, args.params, (err, res) => {
            done(err, res);
            if (args.close === undefined || args.close === true) {
                args.db.close();
            }
        });
    }
    else if (args.type === "many") {
        col.insertMany(args.data, args.params, (err, res) => {
            done(err, res);
            if (args.close === undefined || args.close === true) {
                args.db.close();
            }
        })
    }
}

function del(args, done) {
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    let options = [
        {
            type: "one", function: () => {
                col.deleteOne(args.query, (err, result) => {
                    done(err, result);
                });
            }
        },
        {
            type: "many", function: () => {
                col.deleteMany(args.query).toArray((err, items) => {
                    done(err, items);
                });
            }
        }
    ];
    options.forEach((obj) => {
        if (obj.type === args.type) {
            obj.function();
            if (args.close === undefined || args.close === true) {
                args.db.close();
            }
        }
    });
}

function update(args, done) {
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    let options = [
        {
            type: "one", function: () => {
                col.updateOne(args.query, args.data, (err, result) => {
                    done(err, result);
                });
            }
        },
        {
            type: "many", function: () => {
                col.updateMany(args.query, args.data, (err, items) => {
                    done(err, items);
                });
            }
        }
    ];
    options.forEach((obj) => {
        if (obj.type === args.type) {
            obj.function();
            if (args.close === undefined || args.close === true) {
                args.db.close();
            }
        }
    });
}

function createCollection(args, done) {
    if (args.db === undefined) {
        args.db = database;
    }

    db.createCollection(args.collection, (err, res) => {
        done(err, res);
        if (args.close === undefined || args.close === true) {
            args.db.close();
        }
    });
}

function dropCollection(args, done) {
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    col.drop((err, res) => {
        done(err, res);
        if (args.close === undefined || args.close === true) {
            args.db.close();
        }
    });
}

function aggregate(args, done) {
    let col;
    if (args.db === undefined) {
        args.db = database;
        col = database.collection(args.collection);
    }
    else {
        col = args.db.collection(args.collection);
    }

    col.aggregate(args.aggQuery, (err, result)=>{
        done(err, result);
        if (args.close === undefined || args.close === true) {
            args.db.close();
        }
    });
}

module.exports = {
    index: index,
    connect: connect,
    close: close,
    insert: insert,
    del: del,
    update: update,
    find: find,
    createCollection: createCollection,
    dropCollection: dropCollection,
    aggregate: aggregate
}