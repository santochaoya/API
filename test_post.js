const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended:false});
//connect to database
const con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'secret',
    database:'test'
});
con.connect(function (err) {
    if(!err){
        console.log("connedted!");
    }else{
        console.log("Error connecting to database");
        res.send({"ERROR":"Error connecting to database"});
    }
});

//post/creator create creator
app.get('/user',function(req,res) {
    res.render("user");
});
app.post('/user', urlencodedParser, function (req, res) {
    var user_data = {
        "username" : req.body.username,
        "password" : req.body.password
    };
    var user = user_data['username'].toString();
    var secret = user_data['password'].toString();
    var sql = "insert into user (username,password) values ?";
    var values = [
        [user,secret]
    ];
    con.connect(function (err) {
        con.query(sql,[values],function (err, rows) {
            if (!err) {
                console.log(rows);
                res.send("successful created!");
            } else {
                console.log(err);
                res.send({"ERROR": "Error getting users"});
            }
        });
    });
});

app.listen(3015,function(){
    console.log('Example app listening on port:3015');
});