var terrorismApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = terrorismApi;

terrorismApi.register = function(app, dbTerrorism, terrorism_data) {

    app.get(BASE_API_PATH + "/global-terrorism-data/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3873871/f06-copy/RVu5i8Ti");
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
    /*
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
    */

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

        if (country != datareq.country_txt || city != datareq.city || year != datareq.iyear || month != datareq.imonth || day != datareq.iday) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        dbTerrorism.update({ "country_txt": datareq.country_txt, "city": city, "iyear": year, "imonth": month, "iday": day }, datareq, (err, numUpdated) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log("Updated: " + numUpdated);
        });
        res.sendStatus(200);
    });

    //-----------------------------------BUSQUEDAS--------------------------------

    ///////////////////////// Función para buscar ///////////////////////////////
    var busqueda = function(dato, conjuntoauxiliar, desde, hasta, iyear, imonth, iday, country_txt, city, attacktype_txt, weaptype_txt, nkill) {

        console.log("Búsqueda con parametros: from = " + desde + " ,to = " + hasta + ", iyear = " + iyear + ", imonth = " + imonth + ", iday = " + iday + ", country_txt = " + country_txt +
            ", city = " + city + ", attacktype_txt = " + attacktype_txt + ", weaptype_txt = " + weaptype_txt + ", nkill = " + nkill + ".");

        var from = parseInt(desde);
        var to = parseInt(hasta);


        if (desde != undefined || hasta != undefined || iyear != undefined || imonth != undefined || iday != undefined ||
            country_txt != undefined || city != undefined || attacktype_txt != undefined || weaptype_txt != undefined || nkill != undefined) {


            for (var j = 0; j < dato.length; j++) {
                var anyo = dato[j].iyear;
                var mes = dato[j].imonth;
                var dia = dato[j].iday;
                var pais = dato[j].country_txt;
                var ciudad = dato[j].city;
                var tipoAtaque = dato[j].attacktype_txt;
                var tipoArma = dato[j].weaptype_txt;
                var nMuertos = dato[j].nkill;



                // from y to
                if (desde != undefined && hasta != undefined && country_txt == undefined && iyear == undefined && imonth == undefined && iday == undefined &&
                    city == undefined && attacktype_txt == undefined && weaptype_txt == undefined && nkill == undefined) {
                    if (from <= anyo && to >= anyo) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                //País y año
                else if (desde == undefined && hasta == undefined && country_txt != undefined && iyear != undefined && imonth == undefined && iday == undefined &&
                    city == undefined && attacktype_txt == undefined && weaptype_txt == undefined && nkill == undefined) {
                    if (pais == country_txt && anyo == iyear) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                //País y ciudad
                else if (desde == undefined && hasta == undefined && country_txt != undefined && iyear == undefined && imonth == undefined && iday == undefined &&
                    city != undefined && attacktype_txt == undefined && weaptype_txt == undefined && nkill == undefined) {
                    if (pais == country_txt && ciudad == city) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                //Recurso específico concreto
                else if (desde == undefined && hasta == undefined && country_txt != undefined && iyear != undefined && imonth != undefined && iday != undefined &&
                    city != undefined && attacktype_txt == undefined && weaptype_txt == undefined && nkill == undefined) {
                    if (pais == country_txt && ciudad == city && anyo == iyear && mes == imonth && dia == iday) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (iyear) {
                    if (anyo == iyear) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (imonth) {
                    if (mes == imonth) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (iday) {
                    if (dia == iday) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (country_txt) {
                    if (pais == country_txt) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (city) {
                    if (ciudad == city) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (attacktype_txt) {
                    if (tipoAtaque == attacktype_txt) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (weaptype_txt) {
                    if (tipoArma == weaptype_txt) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (nkill) {
                    if (nMuertos == nkill) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (hasta) {
                    if (to >= anyo) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }

                else if (desde) {
                    if (from <= anyo) {
                        conjuntoauxiliar.push(dato[j]);
                    }
                }
            }
        }
        return conjuntoauxiliar;

    };

    //GET para las busquedas

    app.get(BASE_API_PATH + "/global-terrorism-data", function(req, res) {

        console.log("GET req to /global-terrorism-data ");

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.from;
        var to = req.query.to;
        var anyo = req.query.iyear;
        var mes = req.query.imonth;
        var dia = req.query.iday;
        var pais = req.query.country_txt;
        var ciudad = req.query.city;
        var tipoAtaque = req.query.attacktype_txt;
        var tipoArma = req.query.weaptype_txt;
        var nMuertos = req.query.nkill;

        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            dbTerrorism.find({}).skip(offset).limit(limit).toArray(function(err, data) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500);
                    return;
                }
                else {
                    //if (data.length === 0) {
                        //res.sendStatus(404); //comentar
                    //    return;
                    //}
                    console.log("Sending data: " + JSON.stringify(data, 2, null));
                    if (from || to || anyo || mes || dia || pais || ciudad || tipoAtaque || tipoArma || nMuertos) {

                        aux = busqueda(data, aux, from, to, anyo, mes, dia, pais, ciudad, tipoAtaque, tipoArma, nMuertos);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);
                        }
                        //else {
                            //res.sendStatus(404);
                        //    return;
                    //    }
                    }
                    else {
                        res.send(data.filter((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });

        }
        else {

            dbTerrorism.find({}).toArray(function(err, data) {
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500);
                }
                else {
                   // if (data.length === 0) {
                        //res.sendStatus(404);
                     //   return;
                //    }
                    if (from || to || anyo || mes || dia || pais || ciudad || tipoAtaque || tipoArma || nMuertos) {
                        aux = busqueda(data, aux, from, to, anyo, mes, dia, pais, ciudad, tipoAtaque, tipoArma, nMuertos);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                      //  else {
                            //res.sendStatus(404);
                     //       return;
                   //     }
                    }
                    else {
                        res.send(data.filter((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });
        }

    });

    /////******************************************************GET PARA PAGINACION SIN BUSQUEDA**************************************////////////////////

    app.get(BASE_API_PATH + "/global-terrorism-data/:dato", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.yearFund;
        var to = req.query.yearFund;
        var anyo = req.query.iyear;
        var mes = req.query.imonth;
        var dia = req.query.iday;
        var pais = req.query.country_txt;
        var ciudad = req.query.city;


        var aux = [];
        var aux2 = [];
        var dato = req.params.dato;

        if (limit || offset >= 0) {
            dbTerrorism.find({ $or: [{ "iyear": dato }, { "imonth": dato }, { "iday": dato }, { "country_txt": dato }, { "city": dato }] }).skip(offset).limit(limit).toArray(function(err, data) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500);
                }
                else {
                 //   if (data.length === 0) {
                        //res.sendStatus(404);
                 //       return;
                 //   }
                    if (from || to || anyo || mes || dia || pais || ciudad) {
                        aux = busqueda(data, aux, from, to, anyo, mes, dia, pais, ciudad);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);
                        }
                      //  else {
                            //res.sendStatus(404);
                     //       return;
                     //   }
                    }
                    else {
                        res.send(data.filter((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });

        }
        else {
            //SEGUDA PARTE QUE ES CON OPERADOR OR DE LA BUSQUEDA
            dbTerrorism.find({ $or: [{ "iyear": dato }, { "imonth": dato }, { "iday": dato }, { "country_txt": dato }, { "city": dato }] }).toArray((err, data) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                }
                else {
                   // if (data.length == 0) {
                        //res.sendStatus(404);
                   //     return;
                   // }
                    if (from || to || anyo || mes || dia || pais || ciudad) {
                        aux = busqueda(data, aux, from, to, anyo, mes, dia, pais, ciudad);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                     //   else {
                            //res.sendStatus(404);
                       //     return;
                    //    }
                    }
                    else {
                        console.log(Date() + " - GET /global-terrorism-data/" + dato);
                        res.send(data.filter((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });
        }
    });


};
