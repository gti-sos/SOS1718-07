/*global angular*/
angular
    .module("globalTerrorismApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "globalTerrorismList.html",
                controller: "globalTerrorismListCtrl"
            });
    });
