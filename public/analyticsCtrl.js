angular.module("TerrorismManagerApp").controller("analyticsCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(miguel) {
        $http.get("api/v1/homicide-reports-data").then(function doneFilter(fran) {
            $http.get("api/v1/attacks-data").then(function doneFilter(ismael) {
                var dataMiguel = [];
                var dataFran = [];
                var dataIsma = [];
                for (var i = 0; i<miguel.data.length;i++){
                    dataMiguel.push(miguel.data[i]["nkill"]);
                }
                for(var j = 0; j<fran.data.length; j++){
                    dataFran.push(fran.data[j]["victim_count"]);
                }
                for(var k = 0; k<ismael.data.length; k++){
                    dataIsma.push(ismael.data[k]["injured"]);
                }
                
                Highcharts.chart('container', {

                    title: {
                        text: 'Integracion de los datos de los 3 integrantes del grupo'
                    },

                    subtitle: {
                        text: ''
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
                        name: 'global-terrorism-data',
                        data: dataMiguel
                    }, {
                        name: 'attacks-data',
                        data: dataIsma
                    }, {
                        name: 'homicides-reports-data',
                        data: dataFran
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
    });




}]);
