var express = require("express");
var path = require("path");
//var DataStore = require("nedb");
var bodyParser = require("body-parser");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var request = require("request");

var terrorismApi = require("./terrorismApi");
var homicideApi = require("./homicideApi");
var attacksApi = require("./attacksApi");

//var secureAttacksApi = require("./secureAttacksApi");
//var apikey = require("./apikey");


app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

//Proxy Miguel Angel
app.use("/proxyMA", function(req, res) {
    var url = "https://sos1718-08.herokuapp.com" + req.url;
    console.log('piped: '+req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
    });
    
//Proxy Francisco Jesus
app.use("/proxyFJ", function(req, res) {
    var url = "https://sos1718-05.herokuapp.com" + req.url;
    console.log('piped: '+req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
    });
    
//Proxy Ismael
app.use("/proxyIsmael", function(req, res) {
    var url = "https://sos1718-01.herokuapp.com" + req.url;
    console.log('piped: '+req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
    });


//var BASE_API_PATH = "/api/v1";

var dbGlobalTerrorism = "mongodb://miguelillo42:miguelillo42@ds121889.mlab.com:21889/global-terrorism-data";
var dbHomicideReports = "mongodb://fraperzam:fraperzam@ds229909.mlab.com:29909/homicide-reports-data";
var dbAttacksData = "mongodb://ismalvgue:ismalvgue@ds229909.mlab.com:29909/attacks-data";

var terrorism_data = [
    { "iyear": 1970, "imonth": 7, "iday": 2, "country_txt": "Dominican Republic", "city": "Santo Domingo", "attacktype_txt": "Assassination", "weaptype_txt": "Unknown Explosive Type", "nkill": 1 },
    { "iyear": 1970, "imonth": 2, "iday": 17, "country_txt": "United States", "city": "Oackland", "attacktype_txt": "Bombing/Explosion", "weaptype_txt": "Explosives/Bombs/Dynamite", "nkill": 0 },
    { "iyear": 1970, "imonth": 3, "iday": 1, "country_txt": "Italy", "city": "Rome", "attacktype_txt": "Bombing/Explosion", "weaptype_txt": "Explosives/Bombs/Dynamite", "nkill": 0 },
    { "iyear": 1970, "imonth": 2, "iday": 21, "country_txt": "Switzerland", "city": "Zurich", "attacktype_txt": "Bombing/Explosion", "weaptype_txt": "Explosives/Bombs/Dynamite", "nkill": 47 },
    { "iyear": 1970, "imonth": 2, "iday": 16, "country_txt": "United States", "city": "San Francisco", "attacktype_txt": "Armed Assault", "weaptype_txt": "Firearms", "nkill": 0 }
];

var homicide_data = [
    { "year": 1980,"month": "May", "state": "Alaska", "city": "Anchorage", "crime_type": "Murder or Manslaughter", "weapon": "Rifle", "victim_count": 50},
    { "year": 1980, "month": "August", "state": "Alaska", "city": "North Slope", "crime_type": "Murder or Manslaughter", "weapon": "Rifle", "victim_count": 20},
    { "year": 1980, "month": "July", "state": "Alaska", "city": "Juneau", "crime_type": "Murder or Manslaughter", "weapon": "Firearm", "victim_count": 60},
    { "year": 1980, "month": "March", "state": "Alabama", "city": "Jefferson", "crime_type": "Murder or Manslaughter", "weapon": "Knife", "victim_count": 100},
    { "year": 1994, "month": "April", "state": "New York", "city": "Monroe", "crime_type": "Murder or Manslaughter", "weapon": "Rifle", "victim_count": 15}
];

var attacks_data = 
[{      "country": "spain","date": "2004-03-11","city": "Madrid","killed": 201,"injured": 1841 },
    {   "country": "france","date": "2015-11-12","city": "Paris","killed": 89,"injured": 322 },
    {   "country": "germany","date": "2016-07-18","city": "Wuerzburg","killed": 0,"injured": 5 },
    {   "country": "france","date": "2016-07-14","city": "Nice","killed": 84,"injured": 202 },
    {   "country": "syria","date": "2012-06-06","city": "Qubair","killed": 78,"injured": 0 },
    {   "country": "israel", "date": "2002-03-09,", "city": "Jerusalem", "killed": 11, "injured": 54 },
    {   "country": "pakistan", "date": "2002-03-16", "city": "Jhang", "killed": 5, "injured": 0 },
    {   "country": "iraq", "date": "2008-11-25", "city": "Mosul", "killed": 25, "injured": 6 },
    {   "country": "nigeria", "date": "015-02-01,", "city": "Gombe", "killed": 13, "injured": 7 },
    {   "country": "indonesia", "date": "2002-01-01", "city": "Palu", "killed": 6, "injured": 0 }
];



app.get("/hello", (req, res) => {
    res.send("hello World!");
});

app.listen(process.env.PORT);

// API Miguel Angel, GLOBAL TERRORISM DATA

//var dbTerrorism = new DataStore({
//    filename: dbGlobalTerrorism,
//    autoload: true
//});

MongoClient.connect(dbGlobalTerrorism, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }
    console.log("Connected to DB in mlabs"); //Comentario para borrar ...............................................
    var dbTer = mlabs.db("global-terrorism-data");
    var dbTerrorism = dbTer.collection("global-terrorism-data");

    terrorismApi.register(app, dbTerrorism, terrorism_data);

});




//API Francisco Jesus, HOMICIDE REPORTS DATA

//var dbHomicide = new DataStore({
//    filename: dbHomicideReports,
//    autoload: true
//});



MongoClient.connect(dbHomicideReports, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }
    console.log("Connected to DB in mlabs"); //Comentario para borrar ...............................................
    var dbHom = mlabs.db("homicide-reports-data");
    var dbHomicide = dbHom.collection("homicide-reports-data");

    homicideApi.register(app, dbHomicide, homicide_data);

});


//API Ismael Álvarez, ATTACKS-DATA

MongoClient.connect(dbAttacksData, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }
    console.log("Connected to DB in mlabs"); 
    
    var dbAtta = mlabs.db("attacks-data");
    var dbAttacks = dbAtta.collection("attacks-data");
    
    attacksApi.register(app, dbAttacks, attacks_data);
//    secureAttacksApi.register(app, dbAttacks, attacks_data, apikey.checkApiKey);
    
});


