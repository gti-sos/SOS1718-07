var express = require("express");
var path = require("path");

var app = express();

app.use("/",express.static( path.join(__dirname,"public")));

app.get("/hello",(req,res) =>{
    res.send("hello World!");
});

app.listen(process.env.PORT);