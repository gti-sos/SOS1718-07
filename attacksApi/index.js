var attacksApi = {};
var BASE_API_PATH = "/api/v1/secure";

module.exports = attacksApi;

attacksApi.register = function(app, dbAttacks, attacks_data, checkApiKey) {

    app.get(BASE_API_PATH + "/attacks-data/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3894473/collection/RVu1GVsW");
    });

    app.get(BASE_API_PATH + "/attacks-data/loadInitialData", (req, res) => { //MONGO
        //if (!checkApiKey(req, res)) return;

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

    app.get(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
        if (!checkApiKey(req, res)) return;
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
        // if (!checkApiKey(req, res)) return;
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

            res.send(attacks_data.filter((c) => {
                return (c.country == country);
            })[0]);

        });
    });

    app.post(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
       // if (!checkApiKey(req, res)) return;
        console.log(Date() + " - POST /attacks-data");
        var campos = req.body;

        var estaContenido = dbAttacks.find({ "country": req.params.country, "date": req.params.date }).toArray((err, terrorism) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            return terrorism;
        });

        if (Object.keys(campos).length !== 5) {
            console.warn("Stat does not have the expected fields");
            res.sendStatus(400);
        }

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
       // if (!checkApiKey(req, res)) return;
        var countryy = req.params.country;
        console.log(Date() + " - POST /attacks-data/" + countryy);
        res.sendStatus(405);
    });



    app.delete(BASE_API_PATH + "/attacks-data", (req, res) => {
       // if (!checkApiKey(req, res)) return;
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
       // if (!checkApiKey(req, res)) return;
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
            }

            res.sendStatus(200);
        });
    });



    app.put(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
       // if (!checkApiKey(req, res)) return;
        console.log(Date() + " - PUT /attacks-data");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/attacks-data/:country", (req, res) => { //MONGO
       // if (!checkApiKey(req, res)) return;
        var country = req.params.country;
        var datareq = req.body;

        console.log(Date() + " - PUT /attacks-data/" + country);

        if (country != datareq.country) {
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

  ////*******************************************************************************************************************************////////////////////
    //BUSQUEDA****************************************************************************************
    // GET 
    app.get(BASE_API_PATH + "/attacks-data", function(request, response) {

        console.log("INFO: New GET request to /attacks-data");

        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var autCommunity = request.query.autCommunity;
        var year = request.query.year;
        var enrolledNumber = request.query.enrolledNumber;
        var degree = request.query.degree;
        var master = request.query.master;
        var firstSecondCycle = request.query.firstSecondCycle;

        var aux = [];
        var aux2 = [];
        var aux_empty = [];


        if (limit || offset >= 0) {
            dbAttacks.find({}).skip(offset).limit(limit).toArray(function(err, stats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500);
                    return;
                }
                else {
                    if (stats.length === 0) {
                        response.sendStatus(404);
                        return;
                    }

                    if (from || to || autCommunity || year || enrolledNumber || degree || master || firstSecondCycle) {

                        aux = finder(stats, aux, from, to, autCommunity, year, enrolledNumber, degree, master, firstSecondCycle);

                        if (aux.length > 0) {

                            aux2 = aux.slice(offset, offset + limit);
                            response.send(aux2);
                        }
                        else {

                            response.send(aux_empty);
                            return;
                        }
                    }
                    else {
                        response.send(stats);
                    }
                }
            });

        }
        else {

            SpanUNivStatsdb.find({}).toArray(function(err, stats) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500);
                }
                else {
                    if (stats.length === 0) {

                        response.send(stats);
                        return;
                    }

                    if (from || to || autCommunity || year || enrolledNumber || degree || master || firstSecondCycle) {
                        aux = finder(stats, aux, from, to, autCommunity, year, enrolledNumber, degree, master, firstSecondCycle);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404);
                            return;
                        }
                    }
                    else {
                        response.send(stats);
                    }
                }
            });
        }

    }); 
}; 