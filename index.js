var express = require("express");
var path = require("path");

var app = express();

app.use("/",express.static( path.join(__dirname,"public")));

app.use("/api/v1/global-terrorism-data",express.static(path.join(__dirname,"global-terrorism-data")));
app.use("/api/v1/attacks-data",express.static(path.join(__dirname,"attacks-data")));
app.use("/api/v1/homicide-reports-data",express.static(path.join(__dirname,"homicide-reports-data")));

app.get("/hello",(req,res) =>{
    res.send("hello World!");
});

app.listen(process.env.PORT);