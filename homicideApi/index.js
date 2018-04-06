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
/*
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
            res.send(terrorism.filter((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    app.get(BASE_API_PATH + "/homicide-reports-data/:state", (req, res) => { //MONGODB
        var state = req.params.state;
        console.log(Date() + " - GET /homicide-reports-data/" + state);

        dbHomicide.find({ "state": state }).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }
            else {

                res.send(terrorism.filter((c) => {
                    delete c._id;
                    return c;
                }));
            }
        });
    });
*/
    app.get(BASE_API_PATH + "/homicide-reports-data/:state/:city/:year/:month", (req, res) => { //MONGODB
        var state = req.params.state;
        var city = req.params.city;
        var year = Number(req.params.year);
        var month = req.params.month;
        console.log(Date() + " - GET /homicide-reports-data/" + state + "/" + city + "/" + year + "/" + month);

        dbHomicide.find({ "state": state, "city": city, "year": year, "month": month }).toArray((err, terrorism) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (terrorism.length == 0) {
                res.sendStatus(404);
                return;
            }
            else {

                res.send(terrorism.filter((c) => {
                    delete c._id;
                    return c;
                })[0]);
            }
        });
    });

    app.post(BASE_API_PATH + "/homicide-reports-data", (req, res) => { //MONGODB
        console.log(Date() + " - POST /homicide-reports-data");
        var campos = req.body;

        dbHomicide.find({ "state": req.body.state, "city": req.body.city, "year": req.body.year, "month": req.body.month }).toArray((err, data) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            if (Object.keys(campos).length !== 7) {
                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);
                return;
            }

            if (data.length > 0) {
                res.sendStatus(409);
                return;
            }
            else {
                dbHomicide.insert(req.body, (err, terrorism) => {
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

    //Post no permitido estado
    app.post(BASE_API_PATH + "/homicide-reports-data/:state", (req, res) => { //MONGODB

        res.sendStatus(405);
    });

    //Post no permitido estado y ciudad
    app.post(BASE_API_PATH + "/homicide-reports-data/:state/:city", (req, res) => { //MONGODB

        res.sendStatus(405);
    });
    //Post no permitido estado, ciudad y año
    app.post(BASE_API_PATH + "/homicide-reports-data/:state/:city/:year", (req, res) => { //MONGODB

        res.sendStatus(405);
    });
    //Post no permitido estado, ciudad, año y mes
    app.post(BASE_API_PATH + "/homicide-reports-data/:state/:city/:year/:month", (req, res) => { //MONGODB

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

    app.delete(BASE_API_PATH + "/homicide-reports-data/:state", (req, res) => { //MONGODB
        console.log(Date() + " - DELETE /homicide-reports-data");
        var state = req.params.state;

        dbHomicide.remove({ state: state }, { multi: true }, (err, terrorism) => {
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

    app.delete(BASE_API_PATH + "/homicide-reports-data/:state/:city/:year/:month", (req, res) => { //MONGODB

        var state = req.params.state;
        var year = Number(req.params.year);
        var month = req.params.month;
        var city = req.params.city;

        console.log(Date() + " - DELETE /homicide-reports-data");
        dbHomicide.remove({ state: state, city: city, year: year, month: month }, (err, terrorism) => {
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

    app.put(BASE_API_PATH + "/homicide-reports-data/:state/:city/:year/:month", (req, res) => { //MONGODB
        var city = req.params.city;
        var state = req.params.state;
        var year = Number(req.params.year);
        var month = req.params.month;

        var datareq = req.body;

        console.log(Date() + " - PUT /homicide-reports-data/" + city);

        if (state != datareq.state && city != datareq.city && year != datareq.year && month != datareq.month) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        dbHomicide.update({ "state": datareq.state, "city": datareq.city, "year": datareq.year, "month": datareq.month }, datareq, (err, numUpdated) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log("Updated: " + numUpdated);
        });
        res.sendStatus(200);
    });

    //---------------------------FUNCION PARA BUSQUEDAS------------------------------------
    var busquedas = function(bd, conjuntoauxiliar, desde, hasta, anyo, mes, estado, ciudad, tipoCrimen, arma, numeroVictimas) {

        console.log("Búsqueda con parametros: from = " + desde + " ,to = " + hasta + ", year = " + anyo + ", month = " + mes + ", state = " + estado + ", city = " + ciudad +
            ", crime-type = " + tipoCrimen + ", weapon = " + arma + ", victim count = " + numeroVictimas + ".");

        var from = parseInt(desde);
        var to = parseInt(hasta);
        //parametros 


        if (desde != undefined || hasta != undefined || anyo != undefined || mes != undefined || estado != undefined || ciudad != undefined || tipoCrimen != undefined
                        ||    arma != undefined || numeroVictimas != undefined) {


            for (var j = 0; j < bd.length; j++) {
                var year = bd[j].year;
                var month = bd[j].month;
                var state = bd[j].state;
                var city = bd[j].city;
                var crimeType = bd[j].crimeType;
                var weapon = bd[j].weapon;
                var victimCount = bd[j].victimCount;


                if (ciudad, anyo) {
                    if (city == ciudad && year == anyo)
                        conjuntoauxiliar.push(bd[j]);
                }
                
                 if (estado, anyo) {
                    if (state == estado && year == anyo)
                        conjuntoauxiliar.push(bd[j]);
                }


                else if (desde == undefined && hasta == undefined && ciudad) {
                    if (city == ciudad) {
                        conjuntoauxiliar.push(bd[j]);
                    }
                }


                else if (desde && hasta && ciudad == undefined) {

                    if (to >= year && from <= year) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                
                
                else if (hasta) {

                    if (to >= year) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                else if (desde) {

                    if (from <= year) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                else if (estado) {

                    if (state == estado) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                else if (arma) {

                    if (weapon == arma) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                else if (mes) {

                    if (month == mes) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                else if (tipoCrimen) {

                    if (crimeType == tipoCrimen) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }
                else if (numeroVictimas) {

                    if (victimCount == numeroVictimas) {

                        conjuntoauxiliar.push(bd[j]);
                    }
                }



            }
        } // llave de cierre de la condicional de los undefined
        return conjuntoauxiliar;

    };
    //----------------------------BUSQUEDA-----------------------------
    
    app.get(BASE_API_PATH + "/homicide-reports-data", function(request, response) {

        console.log("INFO: New GET request to /homicide-reports-data ");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var year = request.query.year;
        var month = request.query.month;
        var state = request.query.state;
        var city = request.query.city;
        var typeCrime= request.query.typeCrime;
        var weapon = request.query.weapon;
        var victimCount = request.query.victimCount;
        

        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            dbHomicide.find({}).skip(offset).limit(limit).toArray(function(err, terrorism) {
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
                    if (from || to || year || month || state || city || typeCrime || weapon || victimCount) {

                        aux = busquedas(terrorism, aux, from, to, year, month, state, city, typeCrime, weapon, victimCount);
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

            dbHomicide.find({}).toArray(function(err, terrorism) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500);
                }
                else {
                    if (terrorism.length === 0) {

                        response.send(terrorism);
                        return;
                    }
                    if (from || to || year || month || state || city || typeCrime || weapon || victimCount) {
                        aux = busquedas(terrorism, aux, from, to, year, month, state, city, typeCrime, weapon, victimCount);
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
    
    /////******************************************************GET PARA PAGINACION SIN BUSQUEDA**************************************////////////////////

    app.get(BASE_API_PATH + "/homicide-reports-data/:dato", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.yearFund;
        var to = req.query.yearFund;
        var state = req.query.state;
        var city = req.query.city;
        var year = req.query.year;
        var month = req.query.month;


        var aux = [];
        var aux2 = [];
        var dato = req.params.dato;

        if (limit || offset >= 0) {
            dbHomicide.find({ $or: [{ "state": dato }, { "city": dato }, { "year": dato }, { "month": dato }] }).skip(offset).limit(limit).toArray(function(err, terrorism) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500);
                }
                else {
                    if (terrorism.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || state || city || year || month) {

                        aux = busquedas(terrorism, aux, from, to, state, year, city, month);
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
            dbHomicide.find({ $or: [{ "state": dato }, { "city": dato }, { "year": dato }, { "month": dato }] }).toArray((err, terrorism) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);

                }
                else {
                    if (terrorism.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    if (from || to || state || city || year || month) {
                        aux = busquedas(terrorism, aux, from, to, state, city, year, month);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        console.log(Date() + " - GET /spanish-universities/" + dato);
                        res.send(terrorism);
                    }
                }
            });

        }
    });


};
