/*global browser*/
/*global element*/
/*global by*/
/*global expect*/


var fs = require("fs");
var path = require("path");

describe('Data is loaded', function(){  //compruebo que los datos se cargan
    it('should show same terrorismData', function(){ //para cada una de las comprobaciones meto la palabra it
        browser
            .get('https://sos1718-07.herokuapp.com/#!/global-terrorism-data')  //accede a la direccion
            .then(function(){
                element
                    .all(by.repeater('data in globalTerrorismData'))  //te devuelve todos los elementos de la pagina que ha cargado que cumplan una condicion, que contengan el ng-repeat
                    .then(function(globalTerrorismData){ //carga todos los homicidios
                        browser
                            .takeScreenshot()
                            .then(function(png){
                                
                                var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01-migue.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                        
                        expect(globalTerrorismData.length).toBeGreaterThan(0);  //tienes que haber mas de 1 homicidio
                    });
            });
        
       
    });
});