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
    database:'crowdfund'
});
//post/backer create backer
app.get('/backer',function(req,res) {
    res.render("backer");
});
app.post('/backer',urlencodedParser,function (req,res) {
    var user_data = {
        "username_b": req.body.username_b,
        "password_b": req.body.password_b,
        "email_b": req.body.email_b,
        "location_b": req.body.location_b,
        "project_id": req.body.project_id,
        "amount": req.body.amount
    };
    var username_b = user_data['username_b'],
        password_b = user_data['password_b'],
        email_b = user_data['email_b'],
        location_b = user_data['location_b'],
        project_id = user_data['project_id'],
        amount = user_data['amount'];
    var values = [username_b,password_b,email_b,location_b,project_id,amount];
    con.connect(function (err) {
        if (!err) {
            console.log("connected!");
            con.query("insert into backer (username_b,password_b,email_b,location_b,project_id) values ?",values, function (err, rows) {
                if (!err) {
                    res.send("successful created!");
                } else {
                    console.log(err);
                    res.send({"ERROR": "Error getting users"});
                }
            });
        } else {
            console.log("Error connecting to database");
            res.send({"ERROR": "Error connecting to database"});
        }
    });
});

app.listen(3015,function(){
    console.log('Example app listening on port:3015');
});