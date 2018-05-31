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
        for (i; i < responseExterna.data.length; i++) {
            var object = {};
            object["label"] = responseExterna.data[i]["date"];
            object["value"] = responseExterna.data[i]["stop-and-search"].length;
            array.push(object);
        }

        FusionCharts.ready(function() {
            var topStores = new FusionCharts({
                    type: 'bar2d',
                    renderAt: 'terceraIntegracionExterna',
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


    $http.get("https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES").then(function doneFilter(responseExterna) {
        FusionCharts.ready(function() {
            var conversionChart = new FusionCharts({
                type: 'bubble',
                renderAt: 'chart-container',
                width: '900',
                height: '600',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "Analysis of INE price",
                        "subcaption": "Last Quarter",
                        "xAxisMinValue": "0",
                        "xAxisMaxValue": "100",
                        "yAxisMinValue": "0",
                        "yAxisMaxValue": "30000",
                        "plotFillAlpha": "70",
                        "plotFillHoverColor": "#6baa01",
                        "showPlotBorder": "0",
                        "xAxisName": "Average Price",
                        "yAxisName": "Units",
                        "numDivlines": "2",
                        "showValues": "1",
                        "showTrendlineLabels": "0",
                        "plotTooltext": "$name : Código INE - $zvalue%",
                        "drawQuadrant": "1",
                        "quadrantLineAlpha": "80",
                        "quadrantLineThickness": "3",
                        "quadrantXVal": "50",
                        "quadrantYVal": "15000",
                        //Quadrant Labels
                        "quadrantLabelTL": "Low Price / High Sale",
                        "quadrantLabelTR": "High Price / High Sale",
                        "quadrantLabelBL": "Low Price / Low Sale",
                        "quadrantLabelBR": "High Price / Low Sale",

                        //Cosmetics
                        "baseFontColor": "#333333",
                        "baseFont": "Helvetica Neue,Arial",
                        "captionFontSize": "14",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0",
                        "showBorder": "0",
                        "bgColor": "#ffffff",
                        "showShadow": "0",
                        "canvasBgColor": "#ffffff",
                        "canvasBorderAlpha": "0",
                        "divlineAlpha": "100",
                        "divlineColor": "#999999",
                        "divlineThickness": "1",
                        "divLineIsDashed": "1",
                        "divLineDashLen": "1",
                        "divLineGapLen": "1",
                        "use3dlighting": "0",
                        "showplotborder": "0",
                        "showYAxisLine": "1",
                        "yAxisLineThickness": "1",
                        "yAxisLineColor": "#999999",
                        "showXAxisLine": "1",
                        "xAxisLineThickness": "1",
                        "xAxisLineColor": "#999999",
                        "showAlternateHGridColor": "0",
                        "showAlternateVGridColor": "0"

                    },
                    "categories": [{
                        "category": [{
                                "label": "$0",
                                "x": "0"
                            },
                            {
                                "label": "$20",
                                "x": "20",
                                "showverticalline": "1"
                            },
                            {
                                "label": "$40",
                                "x": "40",
                                "showverticalline": "1"
                            },
                            {
                                "label": "$60",
                                "x": "60",
                                "showverticalline": "1"
                            },
                            {
                                "label": "$80",
                                "x": "80",
                                "showverticalline": "1"
                            }, {
                                "label": "$100",
                                "x": "100",
                                "showverticalline": "1"
                            }
                        ]
                    }],
                    "dataset": [{
                        "color": "#00aee4",
                        "data": [{
                                "x": "80",
                                "y": "15000",
                                "z": "24",
                                "name": responseExterna.data[0]["Codigo"]
                            },
                            {
                                "x": "60",
                                "y": "18500",
                                "z": "26",
                                "name": responseExterna.data[1]["Codigo"]
                            },
                            {
                                "x": "50",
                                "y": "19450",
                                "z": "19",
                                "name": responseExterna.data[2]["Codigo"]
                            },
                            {
                                "x": "65",
                                "y": "10500",
                                "z": "8",
                                "name": responseExterna.data[3]["Codigo"]
                            },
                            {
                                "x": "43",
                                "y": "8750",
                                "z": "5",
                                "name": responseExterna.data[4]["Codigo"]
                            },
                            {
                                "x": "32",
                                "y": "22000",
                                "z": "10",
                                "name": responseExterna.data[5]["Codigo"]
                            },
                            {
                                "x": "44",
                                "y": "13000",
                                "z": "9",
                                "name": responseExterna.data[6]["Codigo"]
                            }
                        ]
                    }],
                    "trendlines": [{
                        "line": [{
                                "startValue": "20000",
                                "endValue": "30000",
                                "isTrendZone": "1",
                                "color": "#aaaaaa",
                                "alpha": "14"
                            },
                            {
                                "startValue": "10000",
                                "endValue": "20000",
                                "isTrendZone": "1",
                                "color": "#aaaaaa",
                                "alpha": "7"
                            }
                        ]
                    }],
                    "vTrendlines": [{
                        "line": [{
                            "startValue": "44",
                            "isTrendZone": "0",
                            "color": "#0066cc",
                            "thickness": "1",
                            "dashed": "1",
                            "displayValue": "Gross Avg."
                        }]
                    }]
                }
            });
            conversionChart.render();
        });

    });

    var client = new Twitter({
        consumer_key: '	wfgW30S6IF1bHq46ximaGJRYn',
        consumer_secret: '	ThGF6nkeGMfT3UNqFFS6x6GbPypY2yUfxbplarwihJlfieQazR',
        access_token_key: '502182716-UKMUENxnosnV9OdvgeprD8dNavtf5mURW0FgGXIZ',
        access_token_secret: '7Nh90FbRrYbUweCTluxTV1f7e0K7awgrwxlJP5qdT0y3f'
    });

    client.get('search/tweets', { q: 'node.js' }, function(error, tweets, response) {
        console.log(tweets);
    });







}]);
