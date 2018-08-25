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
app.delete('/backer/:id',function (req, res) {
    con.connect(function (err) {
        if(!err){
            console.log("connected!");
            var bid = req.params.id;
            con.query("delete from backer where id = "+ bid,function (err,rows) {
                if(!err){
                    res.send("delete successed!");
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
app.listen(3016,function(){
    console.log('Example app listening on port:3016');
});