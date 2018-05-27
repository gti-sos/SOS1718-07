/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");
    

describe('Add new Data', function() {
    it('should add a new data', function() {
        browser
            .get('https://sos1718-07.herokuapp.com/terrorismApp.html#!/attacks-data')
            .then(function() {
                element.all(by.repeater('data in attacks'))
                    .then(function(initialData) {

                        element(by.model('newAttack.country')).sendKeys('Spain');
                        element(by.model('newAttack.date')).sendKeys(Math.random());
                        element(by.model('newAttack.city')).sendKeys('Sevilla');
                        element(by.model('newAttack.killed')).sendKeys(Math.random());
                        element(by.model('newAttack.injured')).sendKeys(Math.random());

                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('attack in attacksData')).then(function(attacksData) {
                                expect(attacksData.length).toBeGreaterThanOrEqual(initialData.length);
                            });

                        });
                    });
            });
    });
});

