/*global angular*/
/*global Highcharts*/
/*global Morris*/
/*global anychart*/

angular.module("TerrorismManagerApp").controller("vistaIntegracionIsmaelCtrl", ["$scope", "$http", function($scope, $http) {


    $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {
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
            for(var i = 0; i<responseMia.data.length; i++){
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

    ///////////////////    Gráfica externa 3 ///////////////////////
    $http.get("https://restcountries.eu/rest/v2/all").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            anychart.onDocumentReady(function() {
                var data = anychart.data.set([
                    [responseMia.data[0]["killed"], responseExterna.data[0]["area"]],
                    [responseMia.data[1]["killed"], responseExterna.data[1]["area"]],
                    [responseMia.data[2]["killed"], responseExterna.data[2]["area"]],
                    [responseMia.data[3]["killed"], responseExterna.data[3]["area"]]


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
                    .text('Best sportsmen training data ' +
                        '<br/><span  style="color:#929292; font-size: 12px;">' +
                        '(bubble size means duration, each bubble represents one training)</span>'
                    );

                // set chart margin settings
                chart.padding(20, 20, 10, 20);

                // grid settings
                chart.yGrid(true)
                    .xGrid(true)
                    .xMinorGrid(true)
                    .yMinorGrid(true);

                // bubble size settings
                chart.minBubbleSize(5)
                    .maxBubbleSize(40);

                // set chart axes settings
                chart.xAxis()
                    .title('Average pulse during training')
                    .minorTicks(true);
                chart.yAxis()
                    .title('Average power')
                    .minorTicks(true);

                //set chart legend settings
                chart.legend()
                    .enabled(true)
                    .padding({
                        bottom: 10
                    });

                // create first series with mapped data
                chart.bubble(sportsmen1).name('Christopher Sanchez');
                // create second series with mapped data
                chart.bubble(sportsmen2).name('Judy Evans');
                // create third series with mapped data
                chart.bubble(sportsmen3).name('Walter Burke');
                // create forth series with mapped data
                chart.bubble(sportsmen4).name('Daniel Williamson');

                chart.tooltip()
                    .useHtml(true)
                    .fontColor('#fff')
                    .format(function() {
                        return this.getData('data') + '<br/>' +
                            'Power: <span style="color: #d2d2d2; font-size: 12px">' +
                            this.getData('value') + '</span></strong><br/>' +
                            'Pulse: <span style="color: #d2d2d2; font-size: 12px">' +
                            this.getData('x') + '</span></strong><br/>' +
                            'Duration: <span style="color: #d2d2d2; font-size: 12px">' +
                            this.getData('size') + ' min.</span></strong>';
                    });

                // set container id for the chart
                chart.container('terceraIntegracion');

                // initiates chart drawing
                chart.draw();
            });
        }); 
    }); 

}]);
