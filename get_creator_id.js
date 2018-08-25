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
//get creator/:id
app.get('/creator/:id',function (req, res) {
    con.connect(function (err) {
        if(!err){
            console.log("connected!");
            var cid = req.params.id;
            con.query("select * from creator where id = "+ cid,function (err,rows,fields) {
                if(!err){
                    res.json(rows);
                }else{
                    console.log(err);
                    res.send({"ERROR":"Error getting users"});
                }
            });
        }else{
            console.log("Error connecting to database");
            res.send({"ERROR":"Error connecting to database"});
        }
    });
});
app.listen(3007,function(){
    console.log('Example app listening on port:3007');
});