/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");
var config = require("./config-General");

describe('Add new Data', function() {
    it('should add a new data', function() {
        browser
            .get('https://sos1718-07.herokuapp.com/terrorismApp.html#!/global-terrorism-data')
            .then(function() {
                element.all(by.repeater('data in globalTerrorismData'))
                    .then(function(initialData) {

                        element(by.model('newData.country_txt')).sendKeys('Spain');
                        element(by.model('newData.iyear')).sendKeys(Math.random());
                        element(by.model('newData.imonth')).sendKeys(11);
                        element(by.model('newData.iday')).sendKeys(1);
                        element(by.model('newData.city')).sendKeys('Sevilla');
                        element(by.model('newData.attacktype_txt')).sendKeys("Bomb");
                        element(by.model('newData.weaptype_txt')).sendKeys('Explosives');
                        element(by.model('newData.nkill')).sendKeys(Math.random());

                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('data in globalTerrorismData')).then(function(globalTerrorismData) {
                                expect(globalTerrorismData.length).toBeGreaterThanOrEqual(initialData.length);
                            });

                        });
                    });
            });
    });
});
