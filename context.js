const express = require("express");
const app = express();
app.put('/test',function (err,res) {
    var one = "name = ?,age = ?,location = ?";
    var two = ['shaun',30,'CTU'];
    if(!err){
        console.log(one,two);
        res.json(one,two);
    }else{
        res.send("error!")
    }
});
app.listen(6661,function () {
    console.log("example on port 6661!")
});