var terrorismApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = terrorismApi;

terrorismApi.register = function(app, dbTerrorism, terrorism_data) {

    app.get(BASE_API_PATH + "/global-terrorism-data/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3873871/collection/RVu1HAuj");
    });

    app.get(BASE_API_PATH + "/global-terrorism-data/loadInitialData", (req, res) => { //////////////////////////////////MONGO

        dbTerrorism.find({}).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
            }
            if (terrorism.length == 0) {
                console.log("Empty DB");
                dbTerrorism.insert(terrorism_data);
                res.sendStatus(201);
            }
            else {
                console.log("DB has " + terrorism.length + " data");
                res.sendStatus(200);
            }
        });
    });

    app.get(BASE_API_PATH + "/global-terrorism-data", (req, res) => { //////////////////////////////////MONGO
        console.log(Date() + " - GET /global-terrorism-data");

        dbTerrorism.find({}).toArray((err, data) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (data.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.send(data.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    app.get(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        console.log(Date() + " - GET /homicide-reports-data/" + country);

        dbTerrorism.find({ "country_txt": country }).toArray((err, data) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (data.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(terrorism_data.filter((c) => {
                return (c.country_txt == country);
            })[0]);
        });
    });

    app.post(BASE_API_PATH + "/global-terrorism-data", (req, res) => { //////////////////////////////////MONGO
        console.log(Date() + " - POST /global-terrorism-data");

        dbTerrorism.find({ "country_txt": req.params.country_txt, "iday": req.params.iday, "imonth": req.params.imonth, "iyear": req.params.iyear }).toArray((err, data) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            var campos = req.body;
            if (Object.keys(campos).length !== 8) {
                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);
                return;
            }

            if (data.length > 0) {

                res.sendStatus(409);

            }
            else {
                dbTerrorism.insert(req.body, (err, terrorism) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    res.sendStatus(201);
                });
            }


        });

    });

    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => { //////////////////////////////////MONGO
        var countryy = req.params.country_txt;
        console.log(Date() + " - POST /homicide-reports-data/" + countryy);
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/global-terrorism-data", (req, res) => { //////////////////////////////////MONGO
        console.log(Date() + " - DELETE /homicide-reports-data");
        dbTerrorism.remove({}, { multi: true }, (err, data) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (data.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.sendStatus(200);
        });

    });

    app.delete(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        console.log(Date() + " - DELETE /global-terrorism-data " + country);

        dbTerrorism.remove({ country_txt: country }, { multi: false }, (err, terrorism) => {
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

    app.put(BASE_API_PATH + "/global-terrorism-data", (req, res) => { //////////////////////////////////MONGO
        console.log(Date() + " - PUT /global-terrorism-data");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        var datareq = req.body;

        console.log(Date() + " - PUT /homicide-reports-data/" + country);

        if (country != datareq.country_txt) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        dbTerrorism.update({ "country_txt": datareq.country_txt }, datareq, (err, numUpdated) => {
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