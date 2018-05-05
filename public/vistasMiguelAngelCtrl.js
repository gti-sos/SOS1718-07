angular.module("TerrorismManagerApp").controller("vistasMiguelAngelCtrl", ["$scope", "$http", function($scope, $http) {


    $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(response) {

        Highcharts.chart('analytics', {

            title: {
                text: 'Número de víctimas por el terrorismo por año'
            },


            yAxis: {
                title: {
                    text: 'Valores',
                },
                categories: response.data.map(function(d) { return d.nkill })
            },
            xAxis: {
                categories: response.data.map(function(d) { return d.iyear })
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },

            series: [{
                name: 'Data',
                data: response.data.map(function(d) { return d.nkill })
            }]
        });
    });
    
    $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(response) {
        var data = [];
        data = response.data;
        console.log(response.data.filter(d=>d.country_txt== "Italy").length);
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
                ['Dominican Republic', response.data.filter(d => d.country_txt == "Dominican Republic").length],
                ['Italy', response.data.filter(d => d.country_txt == "Italy").length],
                ['United States', response.data.filter(d => d.country_txt == "United States").length],
                ['Switzerland', response.data.filter(d => d.country_txt == "Switzerland").length],
                ['Spain', response.data.filter(d => d.country_txt == "Spain").length],
                ['France', response.data.filter(d => d.country_txt == "France").length],
            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }


    });

}]);
