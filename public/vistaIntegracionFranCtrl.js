/*global angular*/
/*global Highcharts*/
/*global Morris*/
/*global c3*/

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

    $http.get("https://swapi.co/api/people/1/?format=json").then(function doneFilter(responseExterna2) {
        $http.get("https://swapi.co/api/people/2/?format=json").then(function doneFilter(responseExterna3) {
            $http.get("https://swapi.co/api/people/3/?format=json").then(function doneFilter(responseExterna4) {
                $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {



                    FusionCharts.ready(function() {
                        var ageGroupChart = new FusionCharts({
                            type: 'pie2d',
                            renderAt: 'segundaIntegracion',
                            width: '700',
                            height: '600',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "caption": "Victimas por persona",
                                    "subCaption": "This year",
                                    "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                                    "bgColor": "#ffffff",
                                    "showBorder": "0",
                                    "use3DLighting": "0",
                                    "showShadow": "0",
                                    "enableSmartLabels": "0",
                                    "startingAngle": "0",
                                    "showPercentValues": "1",
                                    "showPercentInTooltip": "0",
                                    "decimals": "1",
                                    "captionFontSize": "14",
                                    "subcaptionFontSize": "14",
                                    "subcaptionFontBold": "0",
                                    "toolTipColor": "#ffffff",
                                    "toolTipBorderThickness": "0",
                                    "toolTipBgColor": "#000000",
                                    "toolTipBgAlpha": "80",
                                    "toolTipBorderRadius": "2",
                                    "toolTipPadding": "5",
                                    "showHoverEffect": "1",
                                    "showLegend": "1",
                                    "legendBgColor": "#ffffff",
                                    "legendBorderAlpha": '0',
                                    "legendShadow": '0',
                                    "legendItemFontSize": '10',
                                    "legendItemFontColor": '#666666'
                                },
                                "data": [{
                                        "label": "mass",
                                        "value": responseExterna2.data["mass"]
                                    },
                                    {
                                        "label": "height",
                                        "value": responseExterna3.data["height"]
                                    },
                                    {
                                        "label": "victim_count",
                                        "value": responseMia.data[0]["victim_count"]
                                    }

                                ]
                            }
                        }).render();
                    });


                });
            });
        });
    });


    $http.get("https://libraries.io/api/platforms").then(function doneFilter(responseExterna3) {
        $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {

            FusionCharts.ready(function() {
                var revCompChart = new FusionCharts({
                    type: 'waterfall2d',
                    renderAt: 'terceraIntegracion',
                    width: '700',
                    height: '600',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "Total muertes",
                            "subcaption": "this year",
                            "yAxisname": "Number",
                            "connectordashed": "1",
                            "sumlabel": "Total ",
                            "positiveColor": "#6baa01",
                            "negativeColor": "#e44a00",

                            //Cosmetics
                            "paletteColors": "#0075c2,#1aaf5d,#f2c500",
                            "baseFontColor": "#333344",
                            "baseFont": "Helvetica Neue,Arial",
                            "captionFontSize": "14",
                            "subcaptionFontSize": "14",
                            "subcaptionFontBold": "0",
                            "showBorder": "0",
                            "bgColor": "#ffffff",
                            "showShadow": "0",
                            "canvasBgColor": "#ffffff",
                            "canvasBorderAlpha": "0",
                            "divlineAlpha": "100",
                            "divlineColor": "#999999",
                            "divlineThickness": "1",
                            "divLineIsDashed": "1",
                            "divLineDashLen": "1",
                            "divLineGapLen": "1",
                            "usePlotGradientColor": "0",
                            "showplotborder": "0",
                            "showXAxisLine": "1",
                            "xAxisLineThickness": "1",
                            "xAxisLineColor": "#999999",
                            "showAlternateHGridColor": "0",
                        },
                        "data": [{
                                "label": responseExterna3.data[0]["name"],
                                "value": responseMia.data[0]["victim_count"]
                            },
                            {
                                "label": responseExterna3.data[1]["name"],
                                "value": responseMia.data[1]["victim_count"]
                            },
                            {
                                "label": responseExterna3.data[2]["name"],
                                "issum": responseMia.data[2]["victim_count"]
                            },
                            {
                                "label": responseExterna3.data[3]["name"],
                                "value": responseMia.data[3]["victim_count"]
                            },
                            {
                                "label": responseExterna3.data[4]["name"],
                                "value": responseMia.data[4]["victim_count"]
                            }

                        ]
                    }
                }).render();
            });

        });
    });

    $http.get("https://api.citybik.es/v2/networks/").then(function doneFilter(responseExterna3) {
        $http.get("api/v1/homicide-reports-data").then(function doneFilter(responseMia) {


            Morris.Bar({
                element: 'chartdiv',
                data: [
                    { y: responseExterna3.data["networks"][0]["location"]["city"], a: responseMia.data[4].victim_count, b: responseExterna3.data["networks"][0]["location"]["latitude"] },
                    { y: responseExterna3.data["networks"][1]["location"]["city"], a: responseMia.data[3].victim_count, b: responseExterna3.data["networks"][1]["location"]["latitude"] },
                    { y: responseExterna3.data["networks"][2]["location"]["city"], a: responseMia.data[2].victim_count, b: responseExterna3.data["networks"][2]["location"]["latitude"] },
                    { y: responseExterna3.data["networks"][3]["location"]["city"], a: responseMia.data[0].victim_count, b: responseExterna3.data["networks"][3]["location"]["latitude"] },
                    { y: responseExterna3.data["networks"][4]["location"]["city"], a: responseMia.data[1].victim_count, b: responseExterna3.data["networks"][4]["location"]["latitude"] }

                ],
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Victimas', 'Latitud']
            });
        });
    });

     $http.get("https://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=daboca92").then(function doneFilter(responseExterna5) {
         
         
     });
}]);
