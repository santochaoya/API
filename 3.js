const express = require('express');
const app = express();
const data = require('./exercise/users.json');
const users = data.users;
const bodyParser = require('body-Parser');
const urlencodeParse = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());
app.post('/users',urlencodeParse,function (req,res) {
    var user_data = req.body;
    users.push(user_data);
    res.send(users);
});

app.get('/users',function (req,res) {
    res.json(users);
});
app.get('/users/:id',function (req,res) {
    var id = req.params.id;
    var res_data = "No user";

    for(var user in users){
        console.log(user);
        if(id == users[user].id){
            res_data = users[user];
            break;
        }
    }
    res.json({"1":res_data},{"2":users[user]});
});
app.put('/users/:id',urlencodeParse,function (req,res) {
    var id = req.params.id;
    var user_data = req.body;
    console.log(id);
    for(var user in users){
        if(id == users[user].id){
            console.log(user);
            var uid = users.indexOf(users[user]);
            console.log(uid);
            user_data = users[uid];
            break;
        }
    }
    res.send(user_data);
});
app.delete('/users/:id',function (req,res) {
    var id = req.params.id;
    for(var user in users){
        console.log(user);
        if(id == users[user].id){
            var uid = users.indexOf(users[user]);
            console.log(uid);
            delete users[uid];
        }
    }
    res.send(users);
});
app.listen(3005,function(){
    console.log("example app listening on port 3005!");
});