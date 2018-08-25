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
//login
app.post('/user/login',urlencodedParser,function (req,res,callback) {
    var nowDate = new Date().toISOString().slice(0,19).replace('T',' '),
        params = [req.body.username,req.body.password],
        detailParams = [],
        updateParams = [],
        login_info = 'select * from user where username = ? and password = ?',
        login_values = 'select * from user where id = ?',
        lastlogin_values = 'update user set lastlogin = ? where id = ?';
    con.query(login_info,params,function (err,rows) {
        if(!err) {
            console.log(nowDate);
            console.log(params);
            console.log(rows);
            updateParams = [nowDate, rows[0].id];
            console.log(updateParams);
            detailParams = [rows[0].id];
            console.log(detailParams);
            con.query(lastlogin_values, updateParams, function (err, rows) {
                if (!err) {
                    console.log(rows);
                    con.query(login_values, detailParams, function (err, rows) {
                        console.log(rows);
                        if (!err) {
                            callback(null, rows[0]);
                            res.json({'success': true, 'date': rows});
                        } else {
                            res.json({'error': true, 'message': 'Error logged in'});
                        }
                    });
                } else {
                    res.json({'error': true, 'message': 'Error logged in'});
                }
            });
        }else{
            res.json({'error':true,'message':'Error logged in'});
        }
    });
});
//get all - view all current projects
app.get('/project',function (req,res) {
    con.query('select id,title,subtitle,imageUri from project',function (err,rows) {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
            res.send({"code":404,"msg":"Project not found"});
        }
    });
});
//get creator/:id - view creator by id
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
//get backer/:id - view backer by id
app.get('/backer/:id',function (req, res) {
    var bid = req.params.id;
    con.query("select * from backer where id = "+ bid,function (err,rows,fields) {
        if(!err){
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
//get project/:id - view project details
app.get('/project/:id',function (req,res) {
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
                                    res.json({"project": prow, "creator": crow, "reward": rrow, "backer": brow});
                                } else {
                                    res.send({"code":404,"msg":"Backer not found"});
                                }
                            });
                        }else{
                            res.send({"code":404,"msg":"Reward not found"});
                        }
                    });
                } else {
                    res.send({"code":404,"msg":"Creator not found"});
                }
            });
        }else{
            res.send({"code":404,"msg":"Project not found"});
        }
    });
});
//get project/:id/image
app.get('/project/:id/image',function (req,res) {
    var pid = req.params.id;
    con.query('select imageUri from project where id = '+ pid,function (err,irow) {
        if(!err){
            res.json(irow);
        }else{
            console.log(err);
            res.send({"code":404,"msg":"Project not found"});
        }
    });
});
//get project/:id/reward - view project rewards
app.get('/project/:id/reward',function (req,res) {
    var pid = req.params.id;
    con.query('select id,amount_r,description from reward where project_id = '+ pid,function (err,rprow) {
        if(!err){
            res.json(rprow);
        }else{
            console.log(err);
            res.send({"code":404,"msg":"reward not found"});
        }
    });
});
//post/backer create backer
app.get('/backer',function(req,res) {
res.render("backer");
});
app.post('/backer',urlencodedParser,function (req,res) {
    var username_b = req.body.username_b,
        password_b = req.body.password_b,
        email_b = req.body.email_b,
        location_b = req.body.location_b,
        project_id = req.body.project_id,
        amount = req.body.amount,
        card_num = req.body.card_num,
        expired_date = req.body.expired_date,
        security_code = req.body.security_code;
    var sql = "insert into backer (username_b,password_b,email_b,location_b,project_id,amount) values (?)",
        values = [[username_b,password_b,email_b,location_b,project_id,amount]];
    con.query(sql,values, function (err, rows) {
        if (!err) {
            var credit_card_info = "insert into credit_card (card_num,expired_date,security_code) values ?",
                credit_card_values = [[card_num,expired_date,security_code]];
            con.query(credit_card_info,[credit_card_values],function (err_r,rrows) {
                if(!err_r){
                    res.send({"code":201,"msg":"ok"});
                }else{
                    console.log(err_r);
                    res.send({"code":400,"msg":"Malformed reward data"});
                }
            });
        } else {
            console.log(err);
            res.send({"code":400,"msg":"Malformed user data"});
        }
    });
});
//post/creator create creator
app.get('/creator',function(req,res) {
    res.render("creator");
});
app.post('/creator', urlencodedParser, function (req, res) {
    var username_c = req.body.username_c,
        password_c = req.body.password_c,
        email_c = req.body.email_c,
        location_c = req.body.location_c,
        project_id = req.body.project_id,
        card_num = req.body.card_num,
        expired_date = req.body.expired_date,
        security_code = req.body.security_code;
    var sql = "insert into creator (username_c,password_c,email_c,location_c,project_id) values ?";
    var values = [[username_c,password_c,email_c,location_c,project_id]];
    con.query(sql,[values], function (err, rows) {
        if (!err) {
            var credit_card_info = "insert into credit_card (card_num,expired_date,security_code) values ?",
                credit_card_values = [[card_num,expired_date,security_code]];
            con.query(credit_card_info,[credit_card_values],function (err_r,rrows) {
                if(!err_r){
                    res.send({"code":201,"msg":"ok"});
                }else{
                    console.log(err_r);
                    res.send({"code":400,"msg":"Malformed reward data"});
                }
            });
        } else {
            console.log(err);
            res.send({"code":400,"msg":"Malformed user data"});
        }
    });
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
        creationDate = req.body.creationDate,
        amount_r = req.body.amount_r,
        description_r = req.body.description_r,
        project_id = req.body.project_id;
    var project_info = "insert into project (creationDate,title,subtitle,description,imageUri,target) values ?",
        project_values = [[creationDate,title,subtitle,description,imageUri,target]],
        reward_info = "insert into reward (amount_r,description_r,project_id) values ?",
        reward_values = [[amount_r,description_r,project_id]];
    con.query(project_info,[project_values], function (err, rows) {
        if (!err) {
            con.query(reward_info,[reward_values],function (err_r,rrows) {
                if(!err_r){
                    res.send({"code":201,"msg":"ok"});
                }else{
                    console.log(err_r);
                    res.send({"code":400,"msg":"Malformed reward data"});
                }
            });
        } else {
            console.log(err);
            res.send({"code":400,"msg":"Malformed project data"});
        }
    });
});
//put/backer/:id update backer
app.put('/backer/:id',urlencodedParser,function (req, res) {
    var bid = req.params.id;
    var username_b = req.body.username_b,
        password_b = req.body.password_b,
        email_b = req.body.email_b,
        location_b = req.body.location_b,
        project_id = req.body.project_id,
        amount = req.body.amount;
    var backer_info = "update backer set username_b = ?,password_b = ?,email_b = ?,location_b = ?,project_id = ?,amount = ? where id = ?";
    var backer_data = [username_b,password_b,email_b,location_b,project_id,amount,bid];
    con.query(backer_info,backer_data,function (err,rows) {
        if(!err){
            console.log(rows);
            res.send({"code":201,"msg":"ok"});
        }else{
            console.log(err);
            res.send({"code":400,"msg":"request"});
        }
    });
});
//put/creator/:id update creator
app.put('/creator/:id',urlencodedParser,function (req, res) {
    var cid = req.params.id;
    var username_c = req.body.username_c,
        password_c = req.body.password_c,
        email_c = req.body.email_c,
        location_c = req.body.location_c,
        project_id = req.body.project_id;
    var creator_info = "update creator set username_c = ?,password_c = ?,email_c = ?,location_c = ?,project_id = ? where id = ?";
    var creator_data = [username_c,password_c,email_c,location_c,project_id,cid];
    con.query(creator_info,creator_data,function (err,rows) {
        console.log(rows);
        if(!err){
            console.log(rows);
            res.send({"code":201,"msg":"ok"});
        }else{
            console.log(err);
            res.send({"code":400,"msg":"Malformed request"});
        }
    });
});
//put/project/:id/image update image
app.put('/project/:id/image',urlencodedParser,function (req, res) {
    var rid = req.params.id;
    var imageUri = req.body.imageUri;
    console.log(imageUri);
    var image_info = "update project set imageUri = ? where id = ?";
    var image_data = [[imageUri],rid];
    con.query(image_info,image_data,function (err,rows) {
        if(!err){
            console.log(rows);
            res.send({"code":201,"msg":"ok"});
        }else{
            console.log(err);
            res.send({"code":400,"msg":"Malformed request"});
        }
    });
});
//put/project/:id/rewards
app.put('/project/:id/reward',urlencodedParser,function (req, res) {
    var rid = req.params.id;
    var amount_r = req.body.amount_r;
    var reward_info = "update reward set amount_r = ? where project_id = ?";
    var reward_data = [amount_r,rid];
    con.query(reward_info,reward_data,function (err,rows) {
        if(!err){
            console.log(rows);
            res.send({"code":201,"msg":"ok"});
        }else{
            console.log(err);
            res.send({"code":400,"msg":"Malformed request"});
        }
    });
});
//delete/creator/:id delete creator
app.delete('/creator/:id',function (req, res) {
    var cid = req.params.id;
    con.query("delete from creator where id = "+ cid,function (err,rows) {
        if(!err){
            res.send({"code":200,"msg":"User deleted"});
        }else{
            console.log(err);
            res.send({"code":404,"msg":"User not found"});
        }
    });
});
//delete/backer/:id delete backer
app.delete('/backer/:id',function (req, res) {
    var bid = req.params.id;
    con.query("delete from backer where id = "+ bid,function (err,rows) {
        if(!err){
            res.send({"code":200,"msg":"User deleted"});
        }else{
            console.log(err);
            res.send({"code":404,"msg":"User not found"});
        }
    });
});
app.listen(5299,function(){
    console.log('Example app listening on port:5199');
});