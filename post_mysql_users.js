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
    database:'crowdfund',
});

app.post('/users',urlencodedParser,function (req,res) {
    var user_data = {
        "username":req.body.username_c
    };
    con.connect(function (err){
        if(!err){
            console.log("Connected!");
            var user = user_data['username'].toString();
            const sql = "insert into creator(username_c,password,email,location) values ?";
            var values = [
                ['marry','marry123','marry@uclive.ac.nz','PVG']
            ];
            con.query(sql,[values],function (err,result) {
                con.end();
                if(!err) {
                    res.send({"SUCCESS": "Successfully inserted user"});
                }else{
                    console.log(err);
                    res.send({"ERROR":"Error inserting user"});
                }
            });
        }else{
            console.log("Error connecting to database");
            res.send({"ERROR":"Error connecting to database"});
        }
    });
});
app.listen(3006,function(){
    console.log('Example app listening on port:3006');
});