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
con.connect(function (err) {
    if(!err){
        console.log("connedted!");
    }else{
        console.log("Error connecting to database");
        res.send({"ERROR":"Error connecting to database"});
    }
});

//post/creator create creator
app.get('/creator',function(req,res) {
    res.render("creator");
});
app.post('/creator', urlencodedParser, function (req, res) {
    var user_data = {
        "username_c": req.body.username_c,
        "password_c": req.body.password_c,
        "email_c": req.body.email_c,
        "location_c": req.body.location_c,
        "project_id": req.body.project_id
    };
    var username_c = user_data['username_c'].toString(),
        password_c = user_data['password_c'].toString(),
        email_c = user_data['email_c'].toString(),
        location_c = user_data['location_c'].toString(),
        project_id = user_data['project_id'].toString();
    var sql = "insert into creator (username_c,password_c,email_c,location_c,project_id) values ?";
    var values = [[username_c,password_c,email_c,location_c,project_id]];
    con.connect(function (err) {
        if (!err) {
            console.log(username_c);
            console.log(values);
            console.log("connected!");
            con.query(sql,[values], function (err, rows) {
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