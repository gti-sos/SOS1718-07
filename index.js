var express = require("express");
var path = require("path");
var DataStore = require("nedb");
var bodyParser = require("body-parser");
var app = express();
var MongoClient = require("mongodb").MongoClient;

var terrorismApi = require("./terrorismApi");
var homicideApi = require("./homicideApi");
var attacksApi = require("./attacksApi");


app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));


var BASE_API_PATH = "/api/v1";

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
    { "year": 1980, "month": "May", "state": "Alaska", "city": "Anchorage", "crime-type": "Murder or Manslaughter", "weapon": "Rifle", "victim count": 0},
    { "year": 1980, "month": "August", "state": "Alaska", "city": "North Slope", "crime-type": "Murder or Manslaughter", "weapon": "Rifle", "victim count": 0},
    { "year": 1980, "month": "July", "state": "Alaska", "city": "Juneau", "crime-type": "Murder or Manslaughter", "weapon": "Firearm", "victim count": 0},
    { "year": 1980, "month": "March", "state": "Alabama", "city": "Jefferson", "crime-type": "Murder or Manslaughter", "weapon": "Knife", "victim count": 0},
    { "year": 1994, "month": "April", "state": "New York", "city": "Monroe", "crime-type": "Murder or Manslaughter", "weapon": "Rifle", "victim count": 1}
];

var attacks_data = 
[{      "country": "spain","date": "2004-03-11","city": "Madrid","killed": 201,"injured": 1841 },
    {   "country": "france","date": "2015-11-12","city": "Paris","killed": 89,"injured": 322 },
    {   "country": "germany","date": "2016-07-18","city": "Wuerzburg","killed": 0,"injured": 5 },
    {   "country": "france","date": "2016-07-14","city": "Nice","killed": 84,"injured": 202 },
    {   "country": "syria","date": "2012-06-06","city": "Qubair","killed": 78,"injured": 0 }
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

})


/*
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

app.post(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - POST /homicide-reports-data/" + city);
    res.sendStatus(405);
});


app.delete(BASE_API_PATH + "/homicide-reports-data", (req, res) => {
    console.log(Date() + " - DELETE /homicide-reports-data");

    dbHomicide.remove({}, { multi: true }, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    });
});

app.delete(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => {
    console.log(Date() + " - DELETE /homicide-reports-data");
    var city2 = req.params.city;

    dbHomicide.remove({ city: city2 }, { multi: true }, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    });
});

app.put(BASE_API_PATH + "/homicide-reports-data", (req, res) => {
    console.log(Date() + " - PUT /homicide-reports-data");
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => {
    var city3 = req.params.city;
    var datareq = req.body;

    console.log(Date() + " - PUT /homicide-reports-data/" + city3);

    if (city3 != datareq.city) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    dbHomicide.update({ "city": datareq.city }, datareq, (err, numUpdated) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        console.log("Updated: " + numUpdated);
    });
    res.sendStatus(200);
});
*/


//API Ismael Álvarez, ATTACKS-DATA

/*var dbAttacks = new DataStore({
    filename: dbAttacksData,
    autoload: true
});*/

MongoClient.connect(dbAttacksData, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }
    console.log("Connected to DB in mlabs"); 
    var dbAtta = mlabs.db("attacks-data");
    var dbAttacks = dbAtta.collection("attacks-data");

    attacksApi.register(app, dbAttacks, attacks_data);

});


/*
app.get(BASE_API_PATH + "/attacks-data/loadInitialData", (req, res) => {
    dbAttacks.find({}, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }
        if (terrorism.length == 0) {
            console.log("Empty DB");
            dbAttacks.insert(attacks_data);
            res.sendStatus(201);
        }
        else {
            console.log("DB initialized with " + terrorism.length + " data");
            return;
        }
    });
});


app.get(BASE_API_PATH + "/attacks-data", (req, res) => {
    console.log(Date() + " - GET /attacks-data");

    dbAttacks.find({}, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        res.send(terrorism);
    });
});

app.get(BASE_API_PATH + "/attacks-data/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - GET /attacks-data" + city);

    res.send(attacks_data.filter((c) => {
        return (c.city == city);
    })[0]);
});

app.post(BASE_API_PATH + "/attacks-data", (req, res) => {
    console.log(Date() + " - POST /attacks-data");

    dbAttacks.insert(req.body, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.sendStatus(201);
    });
});

app.post(BASE_API_PATH + "/attacks-data/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - POST /attacks-data " + city);
    res.sendStatus(405);
});


app.delete(BASE_API_PATH + "/attacks-data", (req, res) => {
    console.log(Date() + " - DELETE /attacks-data");

    dbAttacks.remove({}, { multi: true }, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    });
});

app.delete(BASE_API_PATH + "/attacks-data/:city", (req, res) => {
    console.log(Date() + " - DELETE /attacks-data");
    var city2 = req.params.city;

    dbAttacks.remove({ city: city2 }, { multi: true }, (err, terrorism) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    });
});

app.put(BASE_API_PATH + "/attacks-data", (req, res) => {
    console.log(Date() + " - PUT /attacks-data");
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/attacks-data/:city", (req, res) => {
    var city3 = req.params.city;
    var datareq = req.body;

    console.log(Date() + " - PUT /attacks-data " + city3);

    if (city3 != datareq.city) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    dbAttacks.update({ "city": datareq.city }, datareq, (err, numUpdated) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        console.log("Updated: " + numUpdated);
    });
    res.sendStatus(200);
});
*/