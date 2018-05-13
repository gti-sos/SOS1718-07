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
                        pointStart: 2000,
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
            /*      $.getJSON(
                      'https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/range.json',
                      function(data) { */
                Highcharts.chart('integracionPablo', {

                        chart: {
                            type: 'arearange',
                            zoomType: 'x',
                            scrollablePlotArea: {
                                minWidth: 600,
                                scrollPositionX: 1
                            }
                        },

                        title: {
                            text: 'Integracion con la api de Pablo'
                        },

                        xAxis: {
                            categories: responsePablo.data.map(function(d) { return d.city })
                        },

                        yAxis: {
                            title: {
                                text: 'Número de muertos'
                            }
                        },
                        legend: {
                            enabled: false
                        },

                        tooltip: {
                            crosshairs: true,
                            shared: true,
                        },

                        series: [{
                            name: 'Numero de muertos',
                            data: responseMia.data.map(function(d) { return d.killed })
                        }]

                    });
              //  }
            //);


        });
    });
}]);
