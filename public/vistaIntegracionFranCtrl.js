/*global angular*/
/*global Highcharts*/
/*global Morris*/

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
                    pointFormat: '{series.name} killed <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
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
                    data: responseCompi.data.map(function(d) { return (parseFloat(d["min-age"])) })
                }, {
                    name: 'Alabama',
                    data: responseCompi.data.map(function(d) { return (parseFloat(d["second-grade"])) })

                }]
            });


        });
    });

    //PROXY CON API DE JULIO PEREA
    $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {
        $http.get("proxyFJ/api/v1/best-stats").then(function doneFilter(responseCompi) {

            Highcharts.chart('graficaProxy', {

                title: {
                    text: 'Integracion con la API de Julio Perea'
                },


                yAxis: {
                    title: {
                        text: 'Numero de victimas'
                    }
                },
                xAxis: {
                    title: {
                        text: "Año"
                    },
                    categories: responseCompi.data.map(function(d) { return d.year })
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
                        }
                    }
                },

                series: [{
                    name: 'Spain',
                    data: responseMia.data.map(function(d) { return d.victim_count })
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


    //INTEGRACIONES ENTREGABLE FINAL
    $http.get("https://api.nasa.gov/planetary/apod?api_key=ycbzxcPVfJAqLXZOHsd2wXYiEFeL45Tka3m6Ajoy").then(function doneFilter(responseExterna) {
        //$scope.generaDatos = response.data;
        $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {

            Morris.Donut({

                element: 'primeraIntegracion',
                data: [
                    { label: responseExterna.data["date"], value: responseMia.data[4]["victim_count"] },
                    { label: responseExterna.data["media_type"], value: responseMia.data[1]["victim_count"] },
                    { label: responseExterna.data["service_version"], value: responseMia.data[3]["victim_count"] }

                ],
                colors: ['red'],

            });



        });
    });
    
    $http.get("https://lcboapi.com/products?access_key=MDo2NjNiNzhmNC02NDJhLTExZTgtOTVmNC01M2U3YTgzNzc5NDY6d2dKRm92NGNjSjRBYVQxTUdOQTRXOHVteHBQT3VBT0drQjJL").then(function doneFilter(responseExterna2)  {
        
        $scope.generaAlcohol = responseExterna2.data;
        
    });

}]);
