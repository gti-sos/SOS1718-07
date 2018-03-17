var express = require("express");
var path = require("path");

var app = express();

app.use("/",express.static( path.join(__dirname,"public")));

app.use("/api/v1",express.static(path.join(__dirname,"global-terrorism-data")))

app.get("/hello",(req,res) =>{
    res.send("hello World!");
});

app.listen(process.env.PORT);