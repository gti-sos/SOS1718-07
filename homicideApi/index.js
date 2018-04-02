var homicideApi = {}
var BASE_API_PATH = "/api/v1";

module.exports = homicideApi;


homicideApi.register = function(app, dbHomicide, homicide_data) {

    app.get(BASE_API_PATH + "/homicide-reports-data/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3879097/collection/RVu1HAuk");
    });

    app.get(BASE_API_PATH + "/homicide-reports-data/loadInitialData", (req, res) => { //MONGODB

        dbHomicide.find({}).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
            }
            if (terrorism.length == 0) {
                console.log("Empty DB");
                dbHomicide.insert(homicide_data);
                res.sendStatus(201);
            }
            else {
                console.log("DB initialized with " + terrorism.length + " data");
                res.sendStatus(200);
                return;
            }
        });
    });

    app.get(BASE_API_PATH + "/homicide-reports-data", (req, res) => { //MONGODB
        console.log(Date() + " - GET /homicide-reports-data");

        dbHomicide.find({}).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(terrorism.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    app.get(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => { //MONGODB
        var city = req.params.city;
        console.log(Date() + " - GET /homicide-reports-data/" + city);

        dbHomicide.find({ "city": city }).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(homicide_data.filter((c) => {
                return (c.city == city);
            })[0]);
        });
    });

    app.post(BASE_API_PATH + "/homicide-reports-data", (req, res) => { //MONGODB
        console.log(Date() + " - POST /homicide-reports-data");
        var campos = req.body;

        var estaContenido = dbHomicide.find({ "city": req.params.city, "year": req.params.year, "month": req.params.month }).toArray((err, data) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            return data;
        });

        if (Object.keys(campos).length !== 7) {
            console.warn("Stat does not have the expected fields");
            res.sendStatus(400);
            return;
        }

        if (req.body == estaContenido) {
            res.sendStatus(409);
            return;
        }

        dbHomicide.insert(req.body, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log(estaContenido);
            res.sendStatus(201);
        });
    });


    app.post(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => { //MONGODB
        var cityy = req.params.city;
        console.log(Date() + " - POST /homicide-reports-data/" + cityy);
        res.sendStatus(405);
    });


    app.delete(BASE_API_PATH + "/homicide-reports-data", (req, res) => { //MONGODB
        console.log(Date() + " - DELETE /homicide-reports-data");
        dbHomicide.remove({}, { multi: true }, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.sendStatus(200);
        });
    });

    app.delete(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => { //MONGODB
        console.log(Date() + " - DELETE /homicide-reports-data");
        var city2 = req.params.city;

        dbHomicide.remove({ city: city2 }, { multi: true }, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
             if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.sendStatus(200);
        });
    });

    app.put(BASE_API_PATH + "/homicide-reports-data", (req, res) => { //MONGODB
        console.log(Date() + " - PUT /homicide-reports-data");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => { //MONGODB
        var city3 = req.params.city;
        var datareq = req.body;

        console.log(Date() + " - PUT /homicide-reports-data/" + city3);

        if (city3 != datareq.city) {
            res.sendStatus(400);
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
};
