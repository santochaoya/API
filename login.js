const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended:false});
const con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'secret',
    database:'test'
});
con.connect(function (err) {
    if(!err){
        console.log("connedted!");
    }else{
        console.log("Error connecting to database");
        res.send({"ERROR":"Error connecting to database"});
    }
});
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

app.listen(2046,function(){
    console.log('Example app listening on port:2046');
});