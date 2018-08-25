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
//post/project create project
app.get('/project',function(req,res) {
    res.render("project");
});
app.post('/project',urlencodedParser,function (req,res) {
    var title = req.body.title,
        subtitle = req.body.subtitle,
        description = req.body.description,
        imageUri = req.body.imageUri,
        target = req.body.target;
    var values = [title,subtitle,description,imageUri,target];
    con.query("insert into backer (title,subtitle,description,imageUri,target) values ?",values, function (err, rows) {
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