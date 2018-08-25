const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended:false});
//connect to database
const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'secret',
    database: 'crowdfund'
});
con.connect(function (err) {
    if(!err){
        console.log("connedted!");
    }else{
        console.log("Error connecting to database");
        res.send({"ERROR":"Error connecting to database"});
    }
});
app.get('/project',function(req,res) {
    res.render("project");
});
app.put('/project/:id/image',urlencodedParser,function (req, res) {
    var rid = req.params.id;
    var imageUri = req.body.imageUri;
    console.log(imageUri);
    var image_info = "update project set imageUri = ? where id = ?";
    var image_data = [[imageUri],rid];
    con.query(image_info,image_data,function (err,rows) {
        if(!err){
            console.log(rows);
            res.send("update backer successed!");
        }else{
            console.log(err);
            res.send({"ERROR":"Error getting users"});
        }
    });
});
app.listen(3015,function(){
        console.log('Example app listening on port:3015');
});