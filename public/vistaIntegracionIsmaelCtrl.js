/*global angular*/
/*global Highcharts*/
/*global Morris*/
/*global anychart*/
/*global zingchart*/
/*global FusionCharts*/

angular.module("TerrorismManagerApp").controller("vistaIntegracionIsmaelCtrl", ["$scope", "$http", function($scope, $http) {


  /*  $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {
        $http.get("https://sos171811als-sos171811als.c9users.io/api/v2/basketball-stats").then(function doneFilter(responseAntonio) {


            Highcharts.chart('integracionAntonio', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Integración de gráfica con Antonio'
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
                        text: 'Número de muertos'
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} killed <b>{point.y:,.0f}</b><br/> {point.x}'
                },
                plotOptions: {
                    area: {
                        pointStart: 1990,
                        marker: {
                            enabled: false,
                            symbol: 'diamond',
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
                    name: 'Charlotte',
                    data: responseAntonio.data.map(function(d) { return d.first })

                }, {
                    name: 'Boston',
                    data: responseMia.data.map(function(d) { return d.killed })
                }, {
                    name: 'Miami',
                    data: responseAntonio.data.map(function(d) { return d.second })
                }]
            });

        });
    }); 
*/


    /////////////// GRAFICA 1 //////////////
    $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {
        $http.get("https://sos1718-11.herokuapp.com/api/v2/basketball-stats").then(function doneFilter(responseAntonio) {

            var dataFinal = [];
            for(var i = 0; i < responseMia.data.length; i++){
                var dataIntermedia = [];
                dataIntermedia.push(responseMia.data[i]["country"]);
                dataIntermedia.push(responseAntonio.data[i].first);
                dataFinal.push(dataIntermedia);
            }

            Highcharts.chart('integracionAntonio', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Integración de gráfica con Antonio (SOS) junto a mi numero de muertos (% del global)'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} (% muertos)',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: responseAntonio.data[0]["stadium"],
                        y: responseAntonio.data[0]["first"],
                        sliced: true,
                        selected: true
                    }, {
                        name: responseAntonio.data[2]["stadium"],
                        y: responseMia.data[1]["killed"]
                    }, {
                        name: responseAntonio.data[4]["stadium"],
                        y: responseMia.data[2]["killed"]
                    }, {
                        name: responseAntonio.data[5]["stadium"],
                        y: responseMia.data[3]["killed"]
                    }, {
                        name: responseAntonio.data[7]["stadium"],
                        y: responseMia.data[4]["killed"]
                    }]
                }]
            });

        });
    });



    ///////////////// GRAFICA 2////////////////
    $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {
        $http.get("proxyIsmael/api/v1/tvfees-stats").then(function doneFilter(responsePablo) {

            Highcharts.chart('integracionPablo', {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: 'Integracion con la api de Pablo'
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: responsePablo.data.map(function(d) { return d.city })
                },
                yAxis: {
                    title: {
                        text: 'Número de muertos'
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' muertos'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: 'Numero de muertos',
                    data: responseMia.data.map(function(d) { return d.killed })
                }]
            });

        });
    });

    ///////////////////    Gráfica externa 1 ///////////////////////

    $http.get("https://api.jcdecaux.com/vls/v1/stations/?contract=Seville&apiKey=6fa39265431480ca0b5f3393cd78f29e2d436882").then(function doneFilter(responseExterna) {
        //$scope.generaDatos = response.data;
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            var dataFinal = [];
            for (var i = 0; i < responseMia.data.length; i++) {
                var objeto = {};
                objeto["y"] = responseMia.data[i].date;
                objeto["a"] = responseExterna.data[i]["number"];
                dataFinal.push(objeto);
            }
            //console.log(dataFinal);

            Morris.Line({
                element: 'primeraIntegracion',
                data: dataFinal,
                xkey: 'y',
                ykeys: ['a'],
                labels: ['Id de la zona']
            });
        });
    });


    ///////////////////    Gráfica externa 2 ///////////////////////
    $http.get("https://restcountries.eu/rest/v2/all").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {
            anychart.onDocumentReady(function() {
                var data = anychart.data.set([
                    [responseMia.data[0]["killed"], responseExterna.data[0]["area"]],
                    [responseMia.data[1]["killed"], responseExterna.data[1]["area"]],
                    [responseMia.data[2]["killed"], responseExterna.data[2]["area"]],
                    [responseMia.data[3]["killed"], responseExterna.data[3]["area"]],
                    [responseMia.data[4]["killed"], responseExterna.data[8]["area"]],
                    [responseMia.data[5]["killed"], responseExterna.data[5]["area"]],
                    [responseMia.data[6]["killed"], responseExterna.data[6]["area"]],
                    [responseMia.data[7]["killed"], responseExterna.data[7]["area"]]

                ]);
                // create scatter chart
                var chart = anychart.marker(data);

                // set chart padding
                chart.padding([5, 10, 0, 5]);

                // set chart title text settings
                chart.title('Integracion del número de muertos por terrorismo con area de superficie del país de la api externa');

                // create marker series
                var series = chart.marker(data);

                // sets markers settings
                series.stroke('1 #1976d2');
                series.hovered().stroke('1 #1976d2');

                // set tooltip formatter
                series.tooltip()
                    .useHtml(true)
                    .position('right').anchor('left-bottom')
                    .titleFormat(function() {
                        return this.getData('name')
                    })
                    .format(function() {
                        return '<span style="font-size: 12px; color: #E1E1E1">Numero de muertos: </span>' + this.getData('x') + '<br/>' +
                            '<span style="font-size: 12px; color: #E1E1E1">Area del pais (api externa): </span>' + this.getData('value');
                    });

                // set titles for axises
                chart.xAxis().title('Numero de muertos');
                chart.yAxis().title('Api externa');

                // set container id for the chart
                chart.container('segundaIntegracion');
                // initiate chart drawing
                chart.draw();
            });
        });
    });

    ///////////////////    Gráfica  3 ///////////////////////
    $http.get("https://sos1718-09.herokuapp.com/api/v2/spanish-universities").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            anychart.onDocumentReady(function() {
                var data = anychart.data.set([
                    [responseExterna.data[0]["yearFund"], responseMia.data[0]["injured"]],
                    [responseExterna.data[1]["yearFund"], responseMia.data[1]["injured"]],
                    [responseExterna.data[2]["yearFund"], responseMia.data[2]["injured"]],
                    [responseExterna.data[3]["yearFund"], responseMia.data[3]["injured"]],
                    [responseExterna.data[10]["yearFund"], responseMia.data[10]["injured"]]
                ]);

                // create scatter chart
                var chart = anychart.scatter(data);

                // turn on chart animation
                chart.animation(true);

                // set chart title text settings
                chart.title()

                    .enabled(true)
                    .useHtml(true)
                    .padding([0, 0, 10, 0])
                    .text('Integracion de heridos y año de api externa ');

                // set chart margin settings
                chart.padding(10, 10, 5, 10);

                // grid settings
                chart.yGrid(true)
                    .xGrid(true)
                    .xMinorGrid(true)
                    .yMinorGrid(true);

                // bubble size settings
                chart.minBubbleSize(5)
                    .maxBubbleSize(2);

                // set chart axes settings
                chart.xAxis()
                    .title('Media de los años')
                    .minorTicks(true);
                chart.yAxis()
                    .title('Media de heridos')
                    .minorTicks(true);

                //set chart legend settings
                chart.legend()
                    .enabled(true)
                    .padding({
                        bottom: 5
                    });

                chart.tooltip()
                    .useHtml(true)
                    .fontColor('#fff')
                    .format(function() {
                        return 'Heridos: <span style="color: #d2d2d2; font-size: 12px">' +
                            this.getData('value') + '</span></strong><br/>' +
                            'Año: <span style="color: #d2d2d2; font-size: 12px">' +
                            this.getData('x') + '</span></strong><br/>';
                    });

                // set container id for the chart
                chart.container('terceraIntegracion');

                // initiates chart drawing
                chart.draw();
            });
        });
    });

    ///////////////////    Gráfica externa 4 ///////////////////////
    $http.get("https://api.github.com/gists/public").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            var myConfig = {
                backgroundColor: '#FBFCFE',
                type: "ring",
                title: {
                    text: "Integracion api externa 4",
                    fontFamily: 'Lato',
                    fontSize: 14,
                    // border: "1px solid black",
                    padding: "15",
                    fontColor: "#1E5D9E",
                },
                /*          subtitle: {
                              text: "06/10/16 - 07/11/16",
                              fontFamily: 'Lato',
                              fontSize: 12,
                              fontColor: "#777",
                              padding: "5"
                          },*/
                plot: {
                    slice: '50%',
                    borderWidth: 0,
                    backgroundColor: '#FBFCFE',
                    animation: {
                        effect: 2,
                        sequence: 3
                    },
                    valueBox: [{
                            type: 'all',
                            text: '%t',
                            placement: 'out'
                        },
                        {
                            type: 'all',
                            text: '%npv%',
                            placement: 'in'
                        }
                    ]
                },
                tooltip: {
                    fontSize: 16,
                    anchor: 'c',
                    x: '50%',
                    y: '50%',
                    sticky: true,
                    backgroundColor: 'none',
                    borderWidth: 0,
                    thousandsSeparator: ',',
                    text: '<span style="color:%color">Id: %v</span>',
                    mediaRules: [{
                        maxWidth: 500,
                        y: '54%',
                    }]
                },
                plotarea: {
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: "0 0 0 10",
                    margin: "70 0 10 0"
                },
                legend: {
                    toggleAction: 'remove',
                    backgroundColor: '#FBFCFE',
                    borderWidth: 0,
                    adjustLayout: true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    marker: {
                        type: 'circle',
                        cursor: 'pointer',
                        borderWidth: 0,
                        size: 5
                    },
                    item: {
                        fontColor: "#777",
                        cursor: 'pointer',
                        offsetX: -6,
                        fontSize: 12
                    },
                    mediaRules: [{
                        maxWidth: 500,
                        visible: false
                    }]
                },
                scaleR: {
                    refAngle: 270
                },
                series: [{
                        text: "El país es " + [responseMia.data[0]["country"]],
                        values: [responseExterna.data[0]["owner"]["id"]],
                        lineColor: "#00BAF2",
                        backgroundColor: "#00BAF2",
                        lineWidth: 1,
                        marker: {
                            backgroundColor: '#00BAF2'
                        }
                    },
                    {
                        text: "El país es " + [responseMia.data[1]["country"]],
                        values: [responseExterna.data[1]["owner"]["id"]],
                        lineColor: "#E80C60",
                        backgroundColor: "#E80C60",
                        lineWidth: 1,
                        marker: {
                            backgroundColor: '#E80C60'
                        }
                    },
                    {
                        text: "El país es " + [responseMia.data[2]["country"]],
                        values: [responseExterna.data[2]["owner"]["id"]],
                        lineColor: "#9B26AF",
                        backgroundColor: "#9B26AF",
                        lineWidth: 1,
                        marker: {
                            backgroundColor: '#9B26AF'
                        }
                    }
                ]
            };

            zingchart.render({
                id: 'cuartaIntegracion',
                data: {
                    gui: {
                        contextMenu: {
                            button: {
                                visible: true,
                                lineColor: "#2D66A4",
                                backgroundColor: "#2D66A4"
                            },
                            gear: {
                                alpha: 1,
                                backgroundColor: "#2D66A4"
                            },
                            position: "right",
                            backgroundColor: "#306EAA",
                            /*sets background for entire contextMenu*/
                            docked: true,
                            item: {
                                backgroundColor: "#306EAA",
                                borderColor: "#306EAA",
                                borderWidth: 0,
                                fontFamily: "Lato",
                                color: "#fff"
                            }

                        },
                    },
                    graphset: [myConfig]
                },
                height: '499',
                width: '99%'
            });

        });
    });

    ///////////////////    Gráfica externa 5 ///////////////////////
    $http.get("https://simple-weather.p.mashape.com/weatherdata?lat=40.0&lng=-3.0&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            zingchart.THEME = "classic";
            var myConfig = {
                "graphset": [{
                    "type": "hfunnel",
                    "background-color": "#fff",
                    "background-color-2": "#f1f1f1",
                    "scale-x": {
                        "values": [
                            "Ciudades <br>con datos<br> de api externa"
                        ],
                        "item": {
                            "offset-y": -20,
                            "font-size": "12px",
                        }
                    },
                    "tooltip": {
                        "shadow": false
                    },
                    "scale-y": {
                        "visible": false
                    },
                    "scale-y-2": {
                        "values": [
                            "Dato TTL - " + responseExterna.data["query"]["results"]["channel"]["ttl"],
                            "El ancho de imagen es de: " + responseExterna.data["query"]["results"]["channel"]["image"]["width"] + " px",
                            "La altura de la image es de: " + responseExterna.data["query"]["results"]["channel"]["image"]["height"] + " px"
                        ],
                        "guide": {
                            "items": [{
                                    "background-color": "#fff"
                                },
                                {
                                    "background-color": "#eee"
                                },
                                {
                                    "background-color": "#ddd"
                                },
                                {
                                    "background-color": "#ccc"
                                },
                                {
                                    "background-color": "green",
                                    "alpha": 0.2
                                }
                            ]
                        }
                    },
                    "plotarea": {
                        "margin": "75 25 50 80"
                    },
                    "plot": {
                        "tooltip-text": "La ciudad es %v",
                        "scales": "scale-x,scale-y-2",
                        "offset": 40

                    },
                    "series": [{
                            "values": [responseMia.data[0]["city"]

                            ],
                            "background-color": "#5FB4E8",
                            "border-color": "#000000",
                            "shadow": false,
                        },
                        {
                            "values": [responseMia.data[1]["city"]],
                            "background-color": "#EBC765",
                            "border-color": "#000000",
                            "shadow": false,
                        },
                        {
                            "values": [responseMia.data[2]["city"]],
                            "background-color": "#8FB550",
                            "border-color": "#000000",
                            "shadow": false,

                        },
                        {
                            "values": [responseMia.data[3]["city"]],
                            "background-color": "#D17549",
                            "border-color": "#000000",
                            "shadow": false
                        },
                        {
                            "values": [responseMia.data[4]["city"]],
                            "background-color": "#8E468E",
                            "border-color": "#000000",
                            "shadow": false,

                        }
                    ]
                }]
            };

            zingchart.render({
                id: 'quintaIntegracion',
                data: myConfig,
                height: 500,
                width: 1000
            });
        });
    });

    ///////////////////    Gráfica 6 ///////////////////////
    $http.get("https://sos1718-10.herokuapp.com/api/v1/motogp-stats").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            /*   var array = [];
               var i = 0;
               for (i; i < responseExterna.data.length; i++) {
                   var object = {};
                   object["value"] = responseExterna.data[i]["score"].length;
                   array.push(object);
               }  */

            FusionCharts.ready(function() {
                var salesByBrandChart = new FusionCharts({
                    type: 'marimekko',
                    renderAt: 'sextaIntegracion',
                    width: '1000',
                    height: '400',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "Integracion de paises con los puntos de api externa sobre motos, para una fecha",
                            "aligncaptiontocanvas": "0",
                            "yaxisname": "Puntuacion y edad por piloto",
                            "xaxisname": "Paises ",
                            "valueBgColor": "#FFFFFF",
                            "valueBgAlpha": "60",
                            "showPlotBorder": "1",
                            "plotBorderThickness": "0.25",
                            "showxaxispercentvalues": "1",
                            "showsum": "1",
                            //Custom tool-text string built using a combination of HTML and chart macro variables
                            "plottooltext": "<div id='nameDiv' style='font-size: 14px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block;'>$label :</div>{br}Pais: <b>$seriesName</b>{br}Datos del piloto : <b>$dataValue</b>{br}",
                            "theme": "fint"
                        },
                        "categories": [{
                            "category": [
                                { "label": "Para la fecha " + responseMia.data[0]["date"] },
                                { "label": "Para la fecha " + responseMia.data[1]["date"] }
                            ]
                        }],
                        "dataset": [{
                                "seriesname": responseMia.data[0]["country"],
                                "data": [
                                    { "value": responseExterna.data[0]["score"] },
                                    { "value": responseExterna.data[0]["age"] }
                                ]
                            },
                            {
                                "seriesname": responseMia.data[2]["country"],
                                "data": [
                                    { "value": responseExterna.data[1]["score"] },
                                    { "value": responseExterna.data[1]["age"] }
                                ]
                            },
                            {
                                "seriesname": responseMia.data[4]["country"],
                                "data": [
                                    { "value": responseExterna.data[2]["score"] },
                                    { "value": responseExterna.data[2]["age"] }
                                ]
                            },
                            {
                                "seriesname": responseMia.data[6]["country"],
                                "data": [
                                    { "value": responseExterna.data[3]["score"] },
                                    { "value": responseExterna.data[3]["age"] }
                                ]
                            }
                        ]
                    }
                }).render();

            });

        });
    });
}]);
