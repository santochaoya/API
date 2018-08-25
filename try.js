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
    database: 'crowdfund',
});
app.get('/project/:id',function (req,res) {
    con.connect(function (err) {
        if(!err){
            console.log("connected!");
            var pid = req.params.id;
            con.query("select group_concat(username_b separator ';') from backer where project_id =" + pid,function (err,prow) {
                console.log(pid);
                if(err){
                    res.send("error getting users");
                }else{
                    res.json({"project":prow});
                }
            });
        }
    });
});
app.listen(3012,function () {
    console.log("listening on 3012");
});