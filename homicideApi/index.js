var homicideApi = {}
var BASE_API_PATH = "/api/v1";

module.exports = homicideApi;


homicideApi.register = function(app, dbHomicide, homicide_data) {

        app.get(BASE_API_PATH + "/homicide-reports-data/loadInitialData", (req, res) => {

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
                }
            });
        });

        app.get(BASE_API_PATH + "/homicide-reports-data", (req, res) => {
            console.log(Date() + " - GET /homicide-reports-data");

            dbHomicide.find({}).toArray((err, terrorism) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                res.send(terrorism);
            });
        });

        app.get(BASE_API_PATH + "/homicide-reports-data/:city", (req, res) => {
            var city = req.params.city;
            console.log(Date() + " - GET /homicide-reports-data/" + city);

            res.send(homicide_data.filter((c) => {
                return (c.city == city);
            })[0]);
        });

        app.post(BASE_API_PATH + "/homicide-reports-data", (req, res) => { //////////////////////////////////MONGO
            console.log(Date() + " - POST /homicide-reports-data");

            var estaContenido = dbHomicide.find({ "year": req.params.year, "iday": req.params.iday, "imonth": req.params.imonth, "iyear": req.params.iyear }).toArray((err, data) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                return data;
            });

            if (req.body == estaContenido) {
                res.sendStatus(409);
            }

            dbTerrorism.insert(req.body, (err, terrorism) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                console.log(estaContenido);
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
