var terrorismApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = terrorismApi;

terrorismApi.register = function(app, dbTerrorism, terrorism_data) {

    app.get(BASE_API_PATH + "/global-terrorism-data/loadInitialData", (req, res) => {
        dbTerrorism.find({}, (err, terrorism) => {
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
                console.log("DB initialized with " + terrorism.length + " data");
            }
        });
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

    //Preguntar al profesor como rescatar todos los objetos de la base de datos nedb /////////////////////////////////////////////////////////////////////////7
    app.get(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => {
        var country = req.params.country_txt;
        console.log(Date() + " - GET /homicide-reports-data/" + country);

        res.send(terrorism_data.filter((c) => {
            return (c.country_txt == country);
        })[0]);
    });

    app.post(BASE_API_PATH + "/global-terrorism-data", (req, res) => {
        console.log(Date() + " - POST /global-terrorism-data");

        dbTerrorism.insert(req.body, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.sendStatus(201);
        });
    });

    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => {
        var countryy = req.params.country_txt;
        console.log(Date() + " - POST /homicide-reports-data/" + countryy);
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/global-terrorism-data", (req, res) => {
        console.log(Date() + " - DELETE /homicide-reports-data");
        dbTerrorism.remove({}, { multi: true }, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });

    app.delete(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => {
        var country = req.params.country_txt;
        console.log(Date() + " - DELETE /global-terrorism-data " + country);

        dbTerrorism.remove({ country_txt: country }, { multi: true }, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });

    app.put(BASE_API_PATH + "/global-terrorism-data", (req, res) => {
        console.log(Date() + " - PUT /global-terrorism-data");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => {
        var country = req.params.country_txt;
        var datareq = req.body;

        console.log(Date() + " - PUT /homicide-reports-data/" + country);

        if (country != datareq.country_txt) {
            res.sendStatus(409);
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
