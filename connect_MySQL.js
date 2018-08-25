const mysql = require("mysql");
const con = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'secret',
    database:'crowdfund'
});
//insert data into my table
con.connect(function(err){
    if(err)throw err;
    console.log("connected!");
    var sql = "insert into test(username,password) values ?";
    var values = [
        ['jay','jay123'],
        ['bill','bill123']
    ];
    con.query(sql,[values],function (err,result) {
        if(err)throw err;
        console.log(result);
    });
});
