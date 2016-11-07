#Library
## You can see the tutorial in this video https://www.youtube.com/watch?v=giB8kBE8l60

##steps:
* Make sure that you have mongodb
* Remove this comments from the index.js:
```javascript
let userData={firstname:"myuser",lastname:"myuser",login:"myuser",password:"sdsd",email:"myuser@email.com",admin:true};
devis.act({
    clientId: 1,
    role: "users", 
    action: "add"
}, {
    data: userData
}, (err, result) => {

    if (err) console.log(err);
    //res.json(result);
});

```
* Update userData and put what you want. it'll be your first administrator

* Run this commands in Separate terminals

```bash
node app/root
devis start
```

* Stop the index connection.
* Put the code (devis.act...) that we announced in the second step in comment.

* run ```devis star ``` again.

* open your browser open 127.0.0.1:8888 and log.
