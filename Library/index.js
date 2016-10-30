'use strict';
const session = require('express-session'),
    path = require("path"),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    devis = require("devis"),
    data = ['users', 'books', 'messages'],
    sha = crypto.createHash('sha256'),
    multer = require('multer'),
    express = require("express"),
    app = express(),
    colors = require("colors/safe"),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    prefix = "/myapp",
    users = require("./app/route/user")({
        devis: devis
    }),
    books = require("./app/route/book")({
        devis: devis
    }),
    messages = require("./app/route/message")({
        devis: devis
    });

devis.client({
    host: '127.0.0.1',
    port: 3030,
    id: 1
});
/*let userData={firstname:"myuser",lastname:"myuser",login:"myuser",password:"sdsd",email:"myuser@email.com",admin:true};
devis.act({
    clientId: 1,
    role: "users",
    action: "add"
}, {
    data: userData
}, (err, result) => {

    if (err) console.log(err);
    //res.json(result);
});*/
app.use(require("body-parser").json());
sha.update(Math.random().toString());
app.use(session({
    secret: sha.digest('hex'),
    resave: true,
    saveUninitialized: true
}));

app.use(express.static("public"));

var storage = multer.diskStorage({
    destination: './public/alt/img/',
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err)
            cb(null, file.originalname);
        })
    }
})
const upload = multer({
    storage: storage
});
let user = "";

const auth = function(role) {
    return function(req, res, next) {
        if (req.session && req.session.user && (req.session.role == role || req.session.role == 'admin'))
            next();
        else
            res.sendStatus(401);
    }
}
app.get(prefix + '/session', auth('normal'), (req, res) => {
    //console.log(req.session.user);
    res.send(req.session);
});
for (let k in data) {
    app.delete(prefix + '/' + data[k] + '/:id', auth('admin'), eval(data[k]).DELETE);
    app.get(prefix + '/' + data[k] + '/', auth('normal'), eval(data[k]).GET);
    app.get(prefix + '/' + data[k] + '/:id', auth('normal'), eval(data[k]).GET);
    if (data[k] != "books") {
        app.post(prefix + '/' + data[k] + '/', auth('normal'), urlencodedParser, eval(data[k]).POST);
        app.put(prefix + '/' + data[k], auth('admin'), urlencodedParser, eval(data[k]).PUT);
    }

}
//app.post(prefix + '/users',urlencodedParser, users.POST);
app.put(prefix + '/books', auth('normal'), upload.single('picture'), books.PUT);
app.post(prefix + '/books/', auth('admin'), upload.single('picture'), books.POST);
app.post(prefix + '/users/login', urlencodedParser, users.LOGIN);
app.get('/logout', auth('normal'),users.LOGOUT);

app.listen({
    type: 'http',
    port: '8888',
    host: '127.0.0.1',
    protocol: 'http'
});
