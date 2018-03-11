var express = require("express");

var app = express();

app.use("/",express.static("/home/ubuntu/workspace/SOS1718-07/public"));

app.get("/hello",(req,res) =>{
    res.send("hello World!");
});

app.listen(process.env.PORT);