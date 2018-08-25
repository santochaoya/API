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
//post/backer create backer
app.get('/backer',function(req,res) {
    res.render("backer");
});
app.post('/backer',urlencodedParser,function (req,res) {
    var username_b = req.body.username_b,
        password_b = req.body.password_b,
        email_b = req.body.email_b,
        location_b = req.body.location_b,
        project_id = req.body.project_id,
        amount = req.body.amount;
    var sql = "insert into backer (username_b,password_b,email_b,location_b,project_id,amount) values (?)",
        values = [[username_b,password_b,email_b,location_b,project_id,amount]];
    con.query(sql,values, function (err, rows) {
        if (!err) {
            res.send("successful created!");
        } else {
            console.log(err);
            res.send({"ERROR": "Error getting users"});
        }
    });
});

app.listen(3015,function(){
    console.log('Example app listening on port:3015');
});