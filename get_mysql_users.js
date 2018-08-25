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
//get all - view all current projects
app.get('/project',function (req,res) {
    con.connect(function (err) {
        if (!err){
            console.log("connected!");
            con.query('select id,title,subtitle,imageUri from project',function (err,rows,fields) {
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
//get creator/:id - view creator by id
app.get('/creator/:id',function (req, res) {
    con.connect(function (err) {
        if(!err){
            console.log("connected!");
            var cid = req.params.id;
            con.query("select * from creator where id = "+ cid,function (err,rows) {
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
//get backer/:id - view backer by id
app.get('/backer/:id',function (req, res) {
    con.connect(function (err) {
        if(!err){
            console.log("connected!");
            var bid = req.params.id;
            con.query("select * from backer where id = "+ bid,function (err,rows,fields) {
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
//get project/:id - view project details
app.get('/project/:id',function (req,res) {
    con.connect(function (err) {
        if(!err){
            console.log("connected!");
            var pid = req.params.id;
            con.query("select * from project where id =" + pid,function (err_p,prow) {
                console.log(pid);
                if(!err_p){
                    console.log("information of project is shown");
                    con.query("select id,username_c from creator where project_id = " + pid,function (err_c,crow) {
                        if (!err_c) {
                            console.log("information of creator is shown");
                            con.query("select id,amount_r,description from reward where project_id = "+ pid, function (err_r,rrow) {
                                if(!err_r){
                                    console.log("information of reward is shown");
                                    con.query("select username_b,amount from backer where project_id = "+ pid, function (err_b,brow) {
                                        if (!err_b) {
                                            console.log("information of backer is shown");
                                            res.json({"prject": prow, "creator": crow, "reward": rrow, "backer": brow});
                                        } else {
                                            res.send("error getting backers");
                                        }
                                    });
                                }else{
                                    res.send("error getting rewards");
                                }
                            });
                        } else {
                            res.send("error getting creators");
                        }
                    });
                }else{
                    res.send("error getting users");
                }
            });
        }
    });
});
//get project/:id/image
app.get('/project/:id/image',function (req,res) {
    con.connect(function (err) {
        if (!err){
            console.log("connected!");
            var pid = req.params.id;
            con.query('select imageUri from project where id = '+ pid,function (err,irow) {
                if(!err){
                    res.json(irow);
                }else{
                    console.log(err);
                    res.send({"ERROR":"Error getting projects"});
                }
            });
        }else{
            console.log("Error connecting to database");
            res.send({"ERROR":"Error connecting to database"});
        }
    });
});
//get project/:id/reward - view project rewards
app.get('/project/:id/reward',function (req,res) {
    con.connect(function (err) {
        if (!err){
            console.log("connected!");
            var pid = req.params.id;
            con.query('select id,amount_r,description from reward where project_id = '+ pid,function (err,rprow) {
                if(!err){
                    res.json(rprow);
                }else{
                    console.log(err);
                    res.send({"ERROR":"Error getting rewards"});
                }
            });
        }else{
            console.log("Error connecting to database");
            res.send({"ERROR":"Error connecting to database"});
        }
    });
});
//post/backer create backer
//post/creator create creator
//post/project create project
app.listen(5199,function(){
    console.log('Example app listening on port:5199');
});