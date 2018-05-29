angular.module("TerrorismManagerApp").controller("vistaIntegracionMiguelAngelCtrl", ["$scope", "$http", function($scope, $http, $tiempo) {

    $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(responseMia) {
        $http.get("https://sos1718-09.herokuapp.com/api/v2/span-univ-stats").then(function doneFilter(responseBalta) {
            Highcharts.chart('integracionBalta', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Integración gráficas Balta y Miguel Angel'
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
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} killed <b>{point.y:,.0f}</b><br/> {point.x}'
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
                    name: 'United States',
                    data: responseBalta.data.map(function(d) { return d.enrolledNumber })

                }, {
                    name: 'canarias',
                    data: responseMia.data.map(function(d){return d.nkill})
                },{
                    name: 'Italy',
                    data: responseBalta.data.map(function(d){return d.master})
                }]
            });
        });
    });

    //Con proxy (Josenri)

    $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(responseMia) {
        $http.get("proxyMA/api/v2/crimes-an").then(function doneFilter(responseJose) {
            Highcharts.chart('integracionJose', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Integracion con api de Jose Enrique'
                },
                xAxis: {
                    categories: responseJose.data.map(function(d) { return d.province })
                },
                yAxis: {
                    title: {
                        text: 'Numero de fallecidos'
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'Numero de fallecidos',
                    data: responseMia.data.map(function(d) { return d.nkill })
                }]
            });

        });
    });
    
    // NUEVO EN D03 ************************************************************************************************************+
    
    $http.get("https://api.openweathermap.org/data/2.5/weather?q=Seville&appid=a58c838b9e41e87a40337f6e0b5ebc10").then(function doneFilter(response){
        $scope.localidad = response.data['sys'];
        console.log(response.data['sys']['country']);
    });
    
    
    
    
    
    
    
    
    
    
    
    

}]);
