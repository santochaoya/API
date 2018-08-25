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
//post/project create project
app.get('/project',function(req,res) {
    res.render("project");
});
app.post('/project',urlencodedParser,function (req,res) {
    var title = req.body.title,
        subtitle = req.body.subtitle,
        description = req.body.description,
        imageUri = req.body.imageUri,
        target = req.body.target,
        creationDate = req.body.creationDate;
        console.log(title);
        console.log(target);
    var sql = "insert into project (creationDate,title,subtitle,description,imageUri,target) values ?",
        values = [[creationDate,title,subtitle,description,imageUri,target]];
    con.query(sql,[values], function (err, rows) {
        if (!err) {
            res.send("successful created!");
        } else {
            console.log(err);
            res.send({"ERROR": "Error getting users"});
        }
    });
});


app.listen(3034,function(){
    console.log('Example app listening on port:3034');
});