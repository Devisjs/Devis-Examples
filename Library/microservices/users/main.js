"use strict";
let u= require('./libs/functions');
let users=require('devis');

users.add({
  role:"users",
  action:"add"
},u.add);

users.add({
  role:"users",
  action:"login"
},u.login);

users.add({
  role:"users",
  action:"delete"
},u.delete);

users.add({
  role:"users",
  action:"update"
},u.update);

users.add({
  role:"users",
  action:"logout"
},u.logout);

users.add({
  role:"users",
  action:"find"
},u.find);

module.exports =users;
