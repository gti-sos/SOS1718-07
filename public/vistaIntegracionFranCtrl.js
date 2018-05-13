/*global angular*/
/*global Highcharts*/


//CORS CON API DE CRISTIAN ROMERO


angular.module("TerrorismManagerApp").controller("vistaIntegracionFranCtrl", ["$scope", "$http", function($scope, $http) {

    $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {
        $http.get("https://sos1718-04.herokuapp.com/api/v1/unemployment-rates").then(function doneFilter(responseCompi) {


            Highcharts.chart('graficaCors', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Integracion con la API de Cristian Romero'
                },
                subtitle: {
                    text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
                        'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
                        'armscontrol.org</a>'
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function() {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Nuclear weapon states'
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                plotOptions: {
                    area: {
                        pointStart: 1940,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'New York',
                    data: responseCompi.data.map(function(d) { return d.illiterate })
                }, {
                    name: 'cordoba',
                    data: responseMia.data.map(function(d) { return d.victim_count })
                }, {
                    name: 'Alaska',
                    data: responseCompi.data.map(function(d) { return d["min-age"] })
                }, {
                    name: 'Alabama',
                    data: responseCompi.data.map(function(d) { return d["second-grade"] })

                }]
            });


        });
    });

    //PROXY CON API DE JULIO PEREA
    $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {
        $http.get("proxyFJ/api/v1/best-stats").then(function doneFilter(responseCompi) {

            Highcharts.chart('graficaProxy', {

                title: {
                    text: 'Solar Employment Growth by Sector, 2010-2016'
                },

                subtitle: {
                    text: 'Source: thesolarfoundation.com'
                },

                yAxis: {
                    title: {
                        text: 'Number of Employees'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Installation',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: 'Manufacturing',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Sales & Distribution',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: 'Project Development',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: 'Other',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });


        });
    });
}]);
