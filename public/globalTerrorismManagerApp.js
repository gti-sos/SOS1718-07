/*global angular*/
angular
    .module("globalTerrorismApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "globalTerrorismList.html",
                controller: "globalTerrorismListCtrl"
            }).when("/global-terrorism-data/:country_txt/:city/:iyear/:imonth/:iday",{
                templateUrl: "globalTerrorismEdit.html",
                controller: "globalTerrorismEditCtrl"
            });
    });
