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

    $http.get("http://api.tvmaze.com/singlesearch/shows?q=girls").then(function doneFilter(responseExterna) {
        //$scope.generaDatos = response.data;
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {

            Morris.Line({
                element: 'primeraIntegracion',
                data: [
                    { y: '2006', a: 100, b: 90 },
                    { y: '2007', a: 75, b: 65 },
                    { y: '2008', a: 50, b: 40 },
                    { y: '2009', a: 75, b: 65 },
                    { y: '2010', a: 50, b: 40 },
                    { y: '2011', a: 75, b: 65 },
                    { y: '2012', a: 100, b: 90 }
                ],
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Series A', 'Series B']
            });
        });
    });


    ///////////////////    Gráfica externa 2 ///////////////////////
    $http.get("https://restcountries.eu/rest/v2/all").then(function doneFilter(responseExterna) {
        $http.get("api/v1/attacks-data").then(function doneFilter(responseMia) {
            anychart.onDocumentReady(function() {
                // The data used in this sample can be obtained from the CDN
                // https://cdn.anychart.com/samples/error-charts/marker-chart/data.json
                var data = anychart.data.set([
                    [responseMia.data[0]["killed"], responseExterna.data["population"]],
                    [responseMia.data[1]["killed"], responseExterna.data["area"]],
                  //  [responseMia.data[2]["killed"], responseExterna.data["main"]["humidity"]],
                  //  [responseMia.data[3]["killed"], responseExterna.data["main"]["temp_min"]]
                ]);
                // create scatter chart
                var chart = anychart.marker(data);

                // set chart padding
                chart.padding([5, 10, 0, 5]);

                // set chart title text settings
                chart.title('Prime Costs and Prices for ACME Fashion\nCollection "Spring-Summer, 2016"');

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
                            '<span style="font-size: 12px; color: #E1E1E1">Api externa: </span>' + this.getData('value');
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

}]);
