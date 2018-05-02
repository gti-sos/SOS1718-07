/*global browser*/
/*global element*/
/*global by*/
/*global expect*/


var fs = require("fs");
var path = require("path");

describe('Data is loaded', function(){  //compruebo que los datos se cargan
    it('should show same homicides', function(){ //para cada una de las comprobaciones meto la palabra it
        browser
            .get('https://sos171807fjpz-sandbox2-sos171807fjpz.c9users.io/terrorismApp.html#!/homicide-reports-data')  //accede a la direccion
            .then(function(){
                element
                    .all(by.repeater('homicide in homicides'))  //te devuelve todos los elementos de la pagina que ha cargado que cumplan una condicion, que contengan el ng-repeat
                    .then(function(homicides){ //carga todos los homicidios
                        browser
                            .takeScreenshot()
                            .then(function(png){
                                
                                var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                    
                    
                        
                        expect(homicides.length).toBeGreaterThan(0);  //tienes que haber mas de 1 homicidio
                    });
            });
        
       
    });
});