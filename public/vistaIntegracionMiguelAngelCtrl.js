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
                    data: responseMia.data.map(function(d) { return d.nkill })
                }, {
                    name: 'Italy',
                    data: responseBalta.data.map(function(d) { return d.master })
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
    // Primera integración api externa usando anyChart y tipo donut
    $http.get("https://api.openweathermap.org/data/2.5/weather?q=Seville&appid=a58c838b9e41e87a40337f6e0b5ebc10").then(function doneFilter(responseExterna) {
        $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(responseMia) {
            anychart.onDocumentReady(function() {
                // create data set
                var data = anychart.data.set([
                    [responseMia.data[0]["country_txt"], responseExterna.data["main"]["temp"]],
                    [responseMia.data[1]["country_txt"], responseExterna.data["main"]["pressure"]],
                    [responseMia.data[2]["country_txt"], responseExterna.data["main"]["humidity"]],
                    [responseMia.data[3]["country_txt"], responseExterna.data["main"]["temp_min"]]
                ]);

                // create pie chart with passed data
                var chart = anychart.pie(data);

                // set chart radius
                chart.innerRadius('65%')
                    // set value for the exploded slices
                    .explode(25);

                // create standalone label and set settings
                var label = anychart.standalones.label();
                label.enabled(true)
                    .text('Zonas recogidas de mi api con info meteorológica de api externa')
                    .width('100%')
                    .height('100%')
                    .adjustFontSize(true, true)
                    .minFontSize(10)
                    .maxFontSize(25)
                    .fontColor('#60727b')
                    .position('center')
                    .anchor('center')
                    .hAlign('center')
                    .vAlign('middle');

                // set label to center content of chart
                chart.center().content(label);

                // create range color palette with color ranged
                var palette = anychart.palettes.rangeColors();
                palette.items([
                    { color: '#c26364' },
                    { color: '#dba869' }
                ]);
                // set chart palette
                chart.palette(palette);

                // set hovered settings
                chart.hovered()
                    .fill('#6f3448');

                // set selected settings
                chart.selected()
                    .fill('#ff6e40');

                // set hovered outline settings
                chart.hovered().outline()
                    .fill(function() {
                        return anychart.color.lighten('#6f3448', 0.55);
                    });

                // set selected outline settings
                chart.selected().outline()
                    .offset(5)
                    .fill(function() {
                        return anychart.color.lighten('#ff6e40', 0.25);
                    });

                // set container id for the chart
                chart.container('primeraIntegracionExterna');
                // initiate chart drawing
                chart.draw();
            });

        });
    });


    $http.get("https://randomuser.me/api/").then(function doneFilter(responseExterna1) {
        $http.get("https://randomuser.me/api/").then(function doneFilter(responseExterna2) {
            $http.get("https://randomuser.me/api/").then(function doneFilter(responseExterna3) {
                $http.get("api/v1/global-Terrorism-Data").then(function doneFilter(responseMia) {
                    anychart.onDocumentReady(function() {

                        var data = anychart.data.set([
                            [responseExterna1.data['results'][0]['email'], responseMia.data[0]["nkill"], 24.2],
                            [responseExterna2.data['results'][0]['email'], responseMia.data[2]["nkill"], 334],
                            [responseExterna3.data['results'][0]['email'], responseMia.data[3]["nkill"], 1045]
                        ]);

                        var wealth = data.mapAs({ 'x': 0, 'value': 1 });

                        var chart = anychart.pie(wealth);
                        chart.labels()
                            .hAlign('center')
                            .position('outside')
                            .format('{%Value} trn.n({%PercentOfCategory}%)');

                        // set chart title text settings
                        chart.title('Numero de victimas de mi api con correos generados aleatoriamente (de api externa)');

                        // set legend title text settings
                        chart.legend()
                            // set legend position and items layout
                            .position('center-bottom')
                            .itemsLayout('horizontal')
                            .align('center');

                        // set container id for the chart
                        chart.container('segundaIntegracionExterna');
                        // initiate chart drawing
                        chart.draw();
                    });

                });
            });
        });
    });


    $http.get("https://data.police.uk/api/crimes-street-dates").then(function doneFilter(responseExterna) {
        
        var array = [];
        var i = 0;
        for(i; i< responseExterna.data.length; i ++){
            var object = {};
            object["label"] = responseExterna.data[i]["date"];
            object["value"] = responseExterna.data[i]["stop-and-search"].length;
            array.push(object);
        }

        FusionCharts.ready(function() {
            var topStores = new FusionCharts({
                    type: 'bar2d',
                    renderAt: 'chart-container',
                    width: '700',
                    height: '600',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "Datos policia uk",
                            "subCaption": "",
                            "yAxisName": "Numero de detenidos",
                            "numberPrefix": "",
                            "paletteColors": "#0075c2",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showCanvasBorder": "0",
                            "usePlotGradientColor": "0",
                            "plotBorderAlpha": "10",
                            "placeValuesInside": "1",
                            "valueFontColor": "#ffffff",
                            "showAxisLines": "1",
                            "axisLineAlpha": "25",
                            "divLineAlpha": "10",
                            "alignCaptionWithCanvas": "0",
                            "showAlternateVGridColor": "0",
                            "captionFontSize": "14",
                            "subcaptionFontSize": "14",
                            "subcaptionFontBold": "0",
                            "toolTipColor": "#ffffff",
                            "toolTipBorderThickness": "0",
                            "toolTipBgColor": "#000000",
                            "toolTipBgAlpha": "80",
                            "toolTipBorderRadius": "2",
                            "toolTipPadding": "5"
                        },

                        "data": array
                    }
                })
                .render();
        });
    });






}]);
