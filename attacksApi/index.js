var attacksApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = attacksApi;

attacksApi.register = function(app, dbAttacks, attacks_data) {

    app.get(BASE_API_PATH + "/attacks-data/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3894473/f06/RVu1HAui");
    });

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


    //////////////////////////////////////////////////////
    // GET 
    //////////////////////////////////////////////////////


    app.get(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        console.log(Date() + " - GET /attacks-data");

        dbAttacks.find({}).toArray((err, terrorism) => {
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

    app.get(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        var country = req.params.country;
        console.log(Date() + " - GET /attacks-data/" + country);

        dbAttacks.find({ "country": country }).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.send(terrorism.filter((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    app.get(BASE_API_PATH + "/attacks-data/:country/:city/:date", (req, res) => { //MONGO
        var country = req.params.country;
        var city = req.params.city;
        var date = req.params.date;
        console.log(Date() + " - GET /attacks-data/" + country + "/" + city + "/" + date);

        dbAttacks.find({ "country": country, "city": city, "date": date }).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.send(terrorism.filter((c) => {
                delete c._id;
                return c;
            })[0]);
        });
    });


    //////////////////////////////////////////////////////
    // POST 
    //////////////////////////////////////////////////////


    app.post(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        console.log(Date() + " - POST /attacks-data");
        var campos = req.body;

        dbAttacks.find({ "country": req.body.country, "city": req.body.city, "date": req.body.date }).toArray((err, terrorism) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            if (Object.keys(campos).length !== 5) {
                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);
                return;
            }

            if (terrorism.length > 0) {
                res.sendStatus(409);
                return;
            }
            else {
                dbAttacks.insert(req.body, (err, terrorism) => {
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

    app.post(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/attacks-data/:country/:city", (req, res) => { //MONGO
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/attacks-data/:country/:city/:date", (req, res) => { //MONGO
        res.sendStatus(405);
    });

    //////////////////////////////////////////////////////
    // DELETE 
    //////////////////////////////////////////////////////

    app.delete(BASE_API_PATH + "/attacks-data", (req, res) => {
        console.log(Date() + " - DELETE /attacks-data");

        dbAttacks.remove({}, { multi: true }, (err, terrorism) => {
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

    app.delete(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        var country = req.params.country;
        console.log(Date() + " - DELETE /attacks-data " + country);

        dbAttacks.remove({ "country": country }, { multi: true }, (err, terrorism) => {
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

    app.delete(BASE_API_PATH + "/attacks-data/:country/:city/:date", (req, res) => { //MONGO
        var country = req.params.country;
        var city = req.params.city;
        var date = req.params.date;
        console.log(Date() + " - DELETE /attacks-data " + country + "/" + city + "/" + date);

        dbAttacks.remove({ "country": country, "city": city, "date": date }, { multi: true }, (err, terrorism) => {
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


    //////////////////////////////////////////////////////
    // PUT 
    //////////////////////////////////////////////////////


    app.put(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        res.sendStatus(405);
    });
    app.put(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
        res.sendStatus(405);
    });
    app.put(BASE_API_PATH + "/attacks-data/:country/:city", (req, res) => { //MONGO
        res.sendStatus(405);
    });


    app.put(BASE_API_PATH + "/attacks-data/:country/:city/:date", (req, res) => { //MONGO
        var country = req.params.country;
        var city = req.params.city;
        var date = req.params.date;
        var datareq = req.body;

        console.log(Date() + " - PUT /attacks-data/" + country + "/" + city + "/" + date);

        if (country != datareq.country || city != datareq.city || date != datareq.date) {
            res.sendStatus(400);
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
