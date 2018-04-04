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

    //Get a un recurso concreto por country
    app.get(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        console.log(Date() + " - GET /global-terrorism-data/" + country);

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
            res.send(data.filter((c) => {
                delete c._id;
                return (c.country_txt == country);
            }));
        });
    });

    //Get a un recurso concreto específico
    app.get(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city/:iyear/:imonth/:iday", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        var city = req.params.city;
        var year = Number(req.params.iyear);
        var month = Number(req.params.imonth);
        var day = Number(req.params.iday);
        console.log(Date() + " - GET /homicide-reports-data/" + country);

        dbTerrorism.find({ "country_txt": country, "city": city, "iyear": year, "imonth": month, "iday": day }).toArray((err, data) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (data.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(data.filter((c) => {
                delete c._id;
                return c;
            })[0]);
        });
    });

    //Post sí permitido, un recurso no puede tener igual a la vez la ciudad, el pais y la fecha.
    app.post(BASE_API_PATH + "/global-terrorism-data", (req, res) => { //////////////////////////////////MONGO
        console.log(Date() + " - POST /global-terrorism-data");

        dbTerrorism.find({ "country_txt": req.body.country_txt, "city": req.body.city, "iday": req.body.iday, "imonth": req.body.imonth, "iyear": req.body.iyear }).toArray((err, data) => {
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

    //Post no permitido (Pais)
    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt", (req, res) => { //////////////////////////////////MONGO
        var countryy = req.params.country_txt;
        console.log(Date() + " - POST /homicide-reports-data/" + countryy);
        res.sendStatus(405);
    });

    //Post no permitido (Pais y ciudad)
    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city", (req, res) => { //////////////////////////////////MONGO
        res.sendStatus(405);
    });

    //Post no permitido (Pais, ciudad y año):
    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city/:iyear", (req, res) => { //////////////////////////////////MONGO
        res.sendStatus(405);
    });

    //Post no permitido (Pais, ciudad, año y mes):
    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city/:iyear/:imonth", (req, res) => { //////////////////////////////////MONGO
        res.sendStatus(405);
    });

    //Post no permitido (Pais, ciudad, año, mes y día):
    app.post(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city/:iyear/:imonth/:iday", (req, res) => { //////////////////////////////////MONGO
        res.sendStatus(405);
    });

    //Delete a todo el conjunto
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

    //Delete a todo un conjunto de un determinado pais
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

    //Delete a un recurso especifico
    app.delete(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city/:iyear/:imonth/:iday", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        var city = req.params.city;
        var year = Number(req.params.iyear);
        var month = Number(req.params.imonth);
        var day = Number(req.params.iday);
        console.log(Date() + " - DELETE /global-terrorism-data " + country);

        dbTerrorism.remove({ "country_txt": country, "city": city, "iyear": year, "imonth": month, "iday": day }, (err, terrorism) => {
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

    app.put(BASE_API_PATH + "/global-terrorism-data/:country_txt/:city/:iyear/:imonth/:iday", (req, res) => { //////////////////////////////////MONGO
        var country = req.params.country_txt;
        var city = req.params.city;
        var year = Number(req.params.iyear);
        var month = Number(req.params.imonth);
        var day = Number(req.params.iday);
        var datareq = req.body;

        console.log(Date() + " - PUT /homicide-reports-data/" + country);

        if (country != datareq.country_txt && city != datareq.city && year != datareq.iyear && month != datareq.imonth && day != datareq.iday) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        dbTerrorism.update({ "country_txt": datareq.country_txt, "city":city, "iyear":year, "imonth":month, "iday": day }, datareq, (err, numUpdated) => {
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
