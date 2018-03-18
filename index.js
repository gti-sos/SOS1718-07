var express = require("express");
var path = require("path");
var DataStore = require("nedb");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));


//var BASE_API_PATH_TERRORISM = "/api/v1/global-terrorism-data";
//var BASE_API_PATH_HOMICIDE = "/api/v1";

var BASE_API_PATH = "/api/v1";

var dbGlobalTerrorism = __dirname + "/globalTerrorismData.db";
var dbHomicideReports = __dirname + "/homicideReportsData.db";


var terrorism_data = [
    { "iyear": 1970, "imonth": 7, "iday": 2, "country_txt": "Dominican Republic", "city": "Santo Domingo", "attacktype_txt": "Assassination", "weaptype_txt": "Unknown Explosive Type", "nkill": 1 },
    { "iyear": 1970, "imonth": 2, "iday": 17, "country_txt": "United States", "city": "Oackland", "attacktype_txt": "Bombing/Explosion", "weaptype_txt": "Explosives/Bombs/Dynamite", "nkill": 0 }
];

var homicide_data = [
    { "year": 1980, "month": "May", "state": "Alaska", "city": "Anchorage", "crime-type": "Murder or Manslaughter", "victim-count": 0},
    { 
        "year": 1980, 
    "month": "August", 
    "state": "Alaska", 
    "city": "North Slope", 
    "crime-type": "Murder or Manslaughter", 
    "victim-count": 0
        
    }
];


app.get("/hello", (req, res) => {
    res.send("hello World!");
});

app.listen(process.env.PORT);

// API Miguel Angel, GLOBAL TERRORISM DATA

var dbTerrorism = new DataStore({
    filename: dbGlobalTerrorism,
    autoload: true
});

dbTerrorism.find({}, (err, terrorism) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }
    if (terrorism.length == 0) {
        console.log("Empty DB");
        dbTerrorism.insert(terrorism_data);
    }
    else {
        console.log("DB initialized with " + terrorism.length + " data");
    }
});

app.get(BASE_API_PATH + "/global-terrorism-data", (req, res) => {
    console.log(Date() + " - GET /global-terrorism-data");

    dbTerrorism.find({}, (err, data) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        res.send(data);
    });
});

app.post(BASE_API_PATH + "/global-terrorism_data", (req, res) => {
    console.log(Date() + " - POST /global-terrorism_data");
    dbTerrorism.insert({}, (err, data) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        var datareq = req.body;
        terrorism_data.push(datareq);
        res.sendStatus(201);
    });
});


app.delete(BASE_API_PATH + "/global-terrorism_data", (req, res) => {
    console.log(Date() + " - DELETE /global-terrorism_data");
    //terrorism_data = [];
    dbTerrorism.remove({});
    res.sendStatus(200);
});

app.put(BASE_API_PATH + "/global-terrorism_data/:country_txt", (req, res) => {
    var country = req.params.country_txt;
    var datareq = req.body;

    console.log(Date() + " - PUT /contacts/" + country);

    if (country != datareq.country_txt) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }
    
    dbTerrorism.update({"country_txt": datareq.country_txt},datareq,(err,numUpdated)=>{
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        console.log("Updated: " + numUpdated);
    });
    res.sendStatus(200);
});

//API Francisco Jesus, HOMICIDE REPORTS DATA

var dbHomicide = new DataStore({
    filename: dbHomicideReports,
    autoload: true
});

dbHomicide.find({}, (err, terrorism) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }
    if (terrorism.length == 0) {
        console.log("Empty DB");
        dbHomicide.insert(homicide_data);
    }
    else {
        console.log("DB initialized with " + terrorism.length + " data");
    }
});

app.get(BASE_API_PATH + "/homicide-reports-data", (req, res) => {
    console.log(Date() + " - GET /homicide-reports-data");

    dbHomicide.find({}, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        res.send(terrorism);
    });
});

app.get(BASE_API_PATH+"/homicide-reports-data/:year",(req,res)=>{
    var year = req.params.year;
    console.log(Date() + " - GET /homicide-reports-data/"+year);
    
    res.send(homicide_data.filter((c)=>{
        return (c.year == year);
    })[0]);
});

app.post(BASE_API_PATH + "/homicide-reports-data", (req, res) => {
    console.log(Date() + " - POST /homicide-reports-data");
    
    dbHomicide.insert(req.body, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        
        res.sendStatus(201);
    });
});


app.delete(BASE_API_PATH + "/homicide-reports-data", (req, res) => {
    console.log(Date() + " - DELETE /homicide-reports-data");
    //terrorism_data = [];
    dbHomicide.remove({});
    res.sendStatus(200);
});

app.delete(BASE_API_PATH+"/homicide-reports-data/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - DELETE /homicide-reports-data/"+city);
    
    homicide_data = homicide_data.filter((c)=>{
        return (c.city != city);
    });
    
    res.sendStatus(200);
});

app.put(BASE_API_PATH + "/homicide-reports-data/:state", (req, res) => {
    var state = req.params.state;
    var datareq = req.body;

    console.log(Date() + " - PUT /homicide-reports-data/" + state);

    if (state != datareq.state) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }
    
    dbHomicide.update({"state": datareq.state},datareq,(err,numUpdated)=>{
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        console.log("Updated: " + numUpdated);
    });
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/homicide-reports-data/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - POST /homicide-reports-data/"+city);
    res.sendStatus(405);
});

app.put(BASE_API_PATH+"/homicide-reports-data",(req,res)=>{
    console.log(Date() + " - PUT /homicide-reports-data");
    res.sendStatus(405);
});