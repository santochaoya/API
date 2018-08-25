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

app.get('/creator/:id',function (req, res) {
    var cid = req.params.id;
    con.query("select * from creator where id = "+ cid,function (err,rows) {
        if(!err) {
            if (rows = []) {
                res.json({"code": 400, "Description": "Invalid id supplied"});
            } else {
                res.json(rows);
            }
        }else{
            console.log(err);
            res.send({"code":404,"msg":"User not found"});
        }
    });
});
app.listen(3050,function(){
    console.log('Example app listening on port:3050');
});