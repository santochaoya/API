const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended:false});
const con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'secret',
    database:'crowdfund'
});
//connect to database
con.connect(function (err) {
    if(!err){
        console.log("connedted!");
    }else{
        console.log("Error connecting to database");
        res.send({"ERROR":"Error connecting to database"});
    }
});
app.get('/backer',function(req,res) {
    res.render("backer");
});
app.put('/backer/:id',urlencodedParser,function (req, res) {
    var bid = req.params.id;
    var username_b = req.body.username_b,
        password_b = req.body.password_b,
        email_b = req.body.email_b,
        location_b = req.body.location_b,
        project_id = req.body.project_id,
        amount = req.body.amount;
    var backer_info = "update backer set username_b = ?,password_b = ?,email_b = ?,location_b = ?,project_id = ?,amount = ? where id = ?";
    var backer_data = [username_b,password_b,email_b,location_b,project_id,amount,bid];
    con.query(backer_info,backer_data,function (err,rows) {
        if(!err){
            console.log(rows);
            res.send("update backer successed!");
        }else{
            console.log(err);
            res.send({"ERROR":"Error getting users"});
        }
    });
});
app.listen(3016,function(){
    console.log('Example app listening on port:3016');
});