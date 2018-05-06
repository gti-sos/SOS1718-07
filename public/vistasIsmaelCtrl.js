angular.module("TerrorismManagerApp").controller("vistasIsmaelCtrl", ["$scope", "$http", function($scope, $http) {

    $http.get("api/v1/attacks-data").then(function doneFilter(response) {


        Highcharts.chart('analytics', {

            title: {
                text: 'Media de los ataques por país al mes'
            },
            xAxis: {
                categories: response.data.map(function(d) { return d.city })
            },
            yAxis: {
                title: {
                    text: 'Ataques'
                },
                categories: response.data.map(function(d) { return d.killed })
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
                name: 'Data',
                data: response.data.map(function(d) { return d.killed })

            }]
        });

    });

    // Gráfico de Gogle

    $http.get("api/v1/attacks-data").then(function doneFilter(response) {
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Incidents'],
                ['Spain', response.data.filter(d => d.country == "spain").length],
                ['Italy', response.data.filter(d => d.country == "italy").length],
                ['United States', response.data.filter(d => d.country == "united states").length],
                ['Switzerland', response.data.filter(d => d.country == "switzerland").length],
                ['France', response.data.filter(d => d.country == "france").length],
            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('segunda'));

            chart.draw(data, options);
        }


    });

    //Gráfica awesoma charting

    $http.get("api/v1/attack-data").then(function doneFilter(response) {






    });



}]);
