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


    /*  app.get(BASE_API_PATH + "/attacks-data", (req, res) => { //MONGO
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
*/

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


    //////////////////////////////////////////////////////
    // FUNCIÓN PARA BÚSQUEDAS 
    //////////////////////////////////////////////////////
    //---------------------------FUNCION PARA BUSQUEDAS------------------------------------//
    var busquedas = function(bd, conjuntoauxiliar, desde, hasta, pais, fecha, ciudad, muertos, heridos) {

        console.log("Búsqueda con parametros: from = " + desde + ", to = " + hasta + ", country = " + pais +
            ", date = " + fecha + ", city = " + ciudad + ", killed = " + muertos + ", injured = " + heridos + ".");

        var from = new Date(desde);
        var to = new Date(hasta);
        //parametros 

        if (desde != undefined || hasta != undefined || pais != undefined || fecha != undefined ||
            ciudad != undefined || muertos != undefined || heridos != undefined) {

            for (var j = 0; j < bd.length; j++) {
                var country = bd[j].country;
                var date = new Date(bd[j].date);
                var city = bd[j].city;
                var killed = bd[j].killed;
                var injured = bd[j].injured;



                /* if (country, city) {
                     if (country == pais && city == ciudad)
                         conjuntoauxiliar.push(bd[j]);
                 }

                else if (country, date) {
                     if (country == country && date == date)
                         conjuntoauxiliar.push(bd[j]);
                 }

                 else if (desde == undefined && hasta == undefined && ciudad) {
                     if (city == ciudad) {
                         conjuntoauxiliar.push(bd[j]);
                     }
                 }

                 else if (desde && hasta && ciudad == undefined) {
                     if (to >= date && from <= date) {
                         conjuntoauxiliar.push(bd[j]);
                     }
                 }*/
                // FROM + TO
                if (desde != undefined && hasta != undefined && pais == undefined && fecha == undefined && ciudad == undefined && muertos == undefined && heridos == undefined) {
                    if (from <= date && to >= date) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                // ROM
                else if (desde != undefined && hasta == undefined && pais == undefined && fecha == undefined && ciudad == undefined && muertos == undefined && heridos == undefined) {
                    if (from <= date) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                // TO
                else if (desde == undefined && hasta != undefined && pais == undefined && fecha == undefined && ciudad == undefined && muertos == undefined && heridos == undefined) {
                    if (to >= date) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }

                else if (pais) {
                    if (country == pais) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }

                else if (fecha) {
                    if (date == fecha) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }

                else if (ciudad) {
                    if (city == ciudad) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }

                else if (muertos) {
                    if (killed == muertos) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }

                else if (heridos) {
                    if (injured == heridos) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                // PAIS + CIUDAD
                else if (desde == undefined && hasta == undefined && pais != undefined && fecha == undefined && ciudad != undefined && muertos == undefined && heridos == undefined) {
                    if (country==pais && city==ciudad) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }


            }
        } // llave de cierre de la condicional de los undefined
        return conjuntoauxiliar;
    };

    //----------------------------BUSQUEDA-----------------------------

    app.get(BASE_API_PATH + "/attacks-data", function(request, response) {

        console.log("INFO: New GET request to /attacks-data ");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var country = request.query.country;
        var date = request.query.date;
        var city = request.query.city;
        var killed = request.query.killed;
        var injured = request.query.injured;

        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            dbAttacks.find({}).skip(offset).limit(limit).toArray(function(err, terrorism) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500);
                    return;
                }
                else {
                    if (terrorism.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending terrorism:: " + JSON.stringify(terrorism, 2, null));
                    if (from || to || country || date || city || killed || injured) {

                        aux = busquedas(terrorism, aux, from, to, country, date, city, killed, injured);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);

                            response.send(aux2);
                        }
                        else {

                            response.send(aux3);
                            return;
                        }
                    }
                    else {
                        response.send(terrorism);
                    }
                }
            });

        }
        else {

            dbAttacks.find({}).toArray(function(err, terrorism) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500);
                }
                else {
                    if (terrorism.length === 0) {
                        response.send(terrorism);
                        return;
                    }
                    if (from || to || country || date || city || killed || injured) {
                        aux = busquedas(terrorism, aux, from, to, country, date, city, killed, injured);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404);
                            return;
                        }
                    }
                    else {
                        response.send(terrorism);
                    }
                }
            });
        }

    });

    /////****************************************GET PARA PAGINACION SIN BUSQUEDA**************************************//

    app.get(BASE_API_PATH + "/attacks-data/:dato", (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.yearFund;
        var to = req.query.yearFund;
        var country = req.query.country;
        var date = req.query.date;
        var city = req.query.city;
        var killed = req.query.killed;
        var injured = req.query.injured;

        var aux = [];
        var aux2 = [];
        var dato = req.params.dato;

        if (limit || offset >= 0) {
            dbAttacks.find({
                $or: [{ "country": dato }, { "date": dato }, { "city": dato }, { "killed": dato },
                    { "injured": dato }
                ]
            }).skip(offset).limit(limit).toArray(function(err, terrorism) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500);
                }
                else {
                    if (terrorism.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || country || date || city || killed || injured) {

                        aux = busquedas(terrorism, aux, from, to, country, date, city, killed, injured);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        res.send(terrorism);
                    }
                }
            });

        }
        else {

            //SEGUDA PARTE QUE ES CON OPERADOR OR DE LA BUSQUEDA
            dbAttacks.find({
                $or: [{ "country": dato }, { "date": dato }, { "city": dato }, { "killed": dato },
                    { "injured": dato }
                ]
            }).toArray((err, terrorism) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);

                }
                else {
                    if (terrorism.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    if (from || to || country || date || city || killed || injured) {

                        aux = busquedas(terrorism, aux, from, to, country, date, city, killed, injured);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        console.log(Date() + " - GET /attacks-data/" + dato);
                        res.send(terrorism);
                    }
                }
            });

        }
    });


};
