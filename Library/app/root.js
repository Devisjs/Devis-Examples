'use strict';
let devis=require('devis');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lib');

devis.use('../microservices/books/main');
devis.use('../microservices/crypto/main');
devis.use('../microservices/messages/main');

devis.use('../microservices/sessions/main');
devis.use('../microservices/users/main');
devis.use('../microservices/mongomodel/main');
devis.listen({host:'127.0.0.1',port:3030});
//module.exports=devis;
