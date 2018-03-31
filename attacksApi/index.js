var attacksApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = attacksApi;

attacksApi.register = function(app, dbAttacks, attacks_data) {

    app.get(BASE_API_PATH + "/attacks-data/loadInitialData", (req, res) => { //MONGO

        dbAttacks.find({}).toArray((err, terrorism) => {
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
                console.log("DB has " + terrorism.length + " data");
                res.sendStatus(200);
            }

        });
    });

    app.get(BASE_API_PATH + "/attacks-data/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3894473/collection/RVu1GVsW");
    });

    app.get(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        console.log(Date() + " - GET /attacks-data");

        dbAttacks.find({}).toArray((err, data) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(attacks_data.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    app.get(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        var country = req.params.country;
        console.log(Date() + " - GET /attacks-data/" + country);

        dbAttacks.find({ "country": country }).toArray((err, data) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(data[0]);
        });
    });

    app.post(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        console.log(Date() + " - POST /attacks-data");

        var estaContenido = dbAttacks.find({ "country": req.params.country, "date": req.params.date }).toArray((err, data) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            return data;
        });

        if (req.body == estaContenido) {
            res.sendStatus(409);
        }

        dbAttacks.insert(req.body, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log(estaContenido);
            res.sendStatus(201);
        });
    });

    app.post(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        var countryy = req.params.country;
        console.log(Date() + " - POST /attacks-data/" + countryy);
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        console.log(Date() + " - DELETE /attacks-data");
        dbAttacks.remove({});
        res.sendStatus(200);

    });

    app.delete(BASE_API_PATH + "attacks-data/:country", (req, res) => { //MONGO
        var country = req.params.country;
        console.log(Date() + " - DELETE /attacks-data " + country);

        dbAttacks.remove({ country: country }, { multi: false }, (err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });

    app.put(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        console.log(Date() + " - PUT /attacks-data");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        var country = req.params.country;
        var datareq = req.body;

        console.log(Date() + " - PUT /attacks-data/" + country);

        if (country != datareq.country) {
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        dbAttacks.update({ "country": datareq.country }, datareq, (err, numUpdated) => {
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
