const express = require('express');
const app = express();
const bodyParser = require('body-Parser');
app.use(bodyParser.json());
const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'secret',
    database:'crowdfund',
});
con.connect(function (err) {
    if (err) throw err;
    console.log("connected!")
});
