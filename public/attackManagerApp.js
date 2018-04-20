 /* global angular */

 angular.module("indexTerrorism", ["ngRoute"]) 
     .config(function($routeProvider) { 
         $routeProvider
             .when("/", {
                 templateUrl: "attackList.html",
                 controller: "ListCtrl"
             })
             .when("/attacks-data/:country", {
                 templateUrl: "attackEdit.html",
                 controller: "EditCtrl"
             });
     });