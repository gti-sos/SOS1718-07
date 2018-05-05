/*global browser*/
/*global element*/
/*global by*/
/*global expect*/



describe('Add homicide', function(){  //compruebo que se añade un homicidio
    it('should add a new homicide', function(){ //para cada una de las comprobaciones meto la palabra it
        browser
            .get('https://sos171807fjpz-sandbox2-sos171807fjpz.c9users.io/terrorismApp.html#!/homicide-reports-data')  //accede a la direccion
            .then(function(){
                element
                    .all(by.repeater('homicide in homicides'))  //te devuelve todos los elementos de la pagina que ha cargado que cumplan una condicion, que contengan el ng-repeat
                    .then(function(initialHomicides){ //carga todos los homicidios
                       
                        
                        element(by.model('newHomicide.year')).sendKeys(1996);
                        element(by.model('newHomicide.month')).sendKeys('July');
                        element(by.model('newHomicide.state')).sendKeys('Alaba');
                        element(by.model('newHomicide.city')).sendKeys('Anchorage');
                        element(by.model('newHomicide.crime_type')).sendKeys('Murder');
                        element(by.model('newHomicide.weapon')).sendKeys('Rifle');
                        element(by.model('newHomicide.victim_count')).sendKeys(200);
                        
                        element(by.buttonText('Add')).click().then(function(){
                            element.all(by.repeater('homicide in homicides')).then(function (homicides){
                                expect(homicides.length).toEqual(initialHomicides.length);
                            });
                        });
                });            
           });
    });
});