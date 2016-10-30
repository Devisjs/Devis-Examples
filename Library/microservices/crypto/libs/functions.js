"use strict";
const crypto = require('crypto');

function hash(args, done) {
    crypto.pbkdf2(args.data, 'salt', 100000, 256, 'sha256', (err, key) => {
        done(err,key.toString('hex'));
    });
}

module.exports={
  hash:hash
}
