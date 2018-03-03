var express = require("express");

var app = express();

app.get("/hello",(req,res) =>{
    res.send("hello World!");
});

app.listen(process.env.PORT);