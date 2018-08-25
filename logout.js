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
app.post('/user/logout',function (req,res,callback) {
    var sess = req.session.user;
    if(sess){
        req.session.user = null;
        return callback(null,{'success':ture,"message":"user logout successfully"});
    }
    callback(null,{'success':ture,"message":"user logout successfully"});
});
app.listen(2046,function(){
    console.log('Example app listening on port:2046');
});