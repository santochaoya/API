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
app.put('/project/:id/reward',urlencodedParser,function (req, res) {
    var rid = req.params.id;
    var amount_r = req.body.amount_r;
    var reward_info = "update reward set amount_r = ? where project_id = ?";
    var reward_data = [amount_r,rid];
    con.query(reward_info,reward_data,function (err,rows) {
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