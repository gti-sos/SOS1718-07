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

        dbHomicide.find({ "state" : state }).toArray((err, terrorism) => {
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

    app.get(BASE_API_PATH + "/homicide-reports-data/:state/:city/:year/:month", (req, res) => { //MONGODB
        var state = req.params.state;
        var city = req.params.city;
        var year = Number(req.params.year);
        var month = req.params.month;
        console.log(Date() + " - GET /homicide-reports-data/" + state +"/"+ city +"/"+ year + "/"+ month);

        dbHomicide.find({ "state": state, "city":city, "year": year , "month": month }).toArray((err, terrorism) => {
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

        dbHomicide.find({"state":req.body.state, "city": req.body.city, "year": req.body.year, "month": req.body.month }).toArray((err, data) => {
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

        dbHomicide.remove({ state: state}, { multi: true }, (err, terrorism) => {
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
        dbHomicide.remove({ state: state, city:city, year:year,month:month}, (err, terrorism) => {
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

        dbHomicide.update({ "state": datareq.state, "city": datareq.city, "year": datareq.year, "month" : datareq.month }, datareq, (err, numUpdated) => {
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
