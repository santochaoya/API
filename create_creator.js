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
    var username_c = req.body.username_c,
        password_c = req.body.password_c,
        email_c = req.body.email_c,
        location_c = req.body.location_c,
        project_id = req.body.project_id;
    var sql = "insert into creator (username_c,password_c,email_c,location_c,project_id) values ?";
    var values = [[username_c,password_c,email_c,location_c,project_id]];
    con.query(sql,[values], function (err, rows) {
        if (!err) {
            res.send("successful created!");
        } else {
            console.log(err);
            res.send({"ERROR": "Error getting users"});
        }
    });
});
app.listen(3016,function(){
    console.log('Example app listening on port:3016');
});