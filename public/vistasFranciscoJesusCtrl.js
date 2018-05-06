/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Plottable*/





angular.module("TerrorismManagerApp").controller("vistasFranciscoJesusCtrl", ["$scope", "$http", function($scope, $http) {

    $http.get("api/v1/homicide-reports-data").then(function doneFilter(response) {


        Highcharts.chart('analytics', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Numero de victimas por cada homicidio en cada ciudad'
            },
            xAxis: {
                title: {
                    text: 'Ciudades'
                },
                categories: response.data.map(function(d) { return d.city })
            },
            yAxis: {
                title: {
                    text: 'Valores'
                },
                categories: response.data.map(function(d) { return d.victim_count })
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Data',
                data: response.data.map(function(d) { return d.victim_count })

            }]
        });
    });



    $http.get("api/v1/homicide-reports-data").then(function doneFilter(response) {
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['State', 'Incidents'],
                ['Alaska', response.data.filter(d => d.state == 'Alaska').length],
                ['Alabama', response.data.filter(d => d.state == 'Alabama').length],
                ['New York', response.data.filter(d => d.state == 'New York').length],
                ['Virginia', response.data.filter(d => d.state == 'Virginia').length],
                ['Washington', response.data.filter(d => d.state == 'Washington').length],
                ['Wisconsin', response.data.filter(d => d.state == 'Wisconsin').length],
                ['California', response.data.filter(d => d.state == 'California').length],
                ['Florida', response.data.filter(d => d.state == 'Florida').length],
                ['Indiana', response.data.filter(d => d.state == 'Indiana').length]

            ]);

            var options = {
                region: 'US',
                displayMode: 'markers',
                colorAxis: { colors: ['green', 'blue'] }
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    });


    // Code for rendering a bar chart
    var xScale = new Plottable.Scales.Category();
    var yScale = new Plottable.Scales.Linear();
    var data = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 2 },
        { x: 4, y: 4 }, { x: 5, y: 3 }, { x: 6, y: 5 }
    ];

    var plot = new Plottable.Plots.Line()
        .addDataset(new Plottable.Dataset(data))
        .x(function(d) { return d.x; }, xScale)
        .y(function(d) { return d.y; }, yScale)
        .renderTo("svg#example");

   


}]);
