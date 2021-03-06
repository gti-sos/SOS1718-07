 /* global angular */

 angular.module("TerrorismManagerApp", ["ngRoute"])
  .config(function($routeProvider) {
   $routeProvider
    .when("/analytics", {
     templateUrl: "analytics.html",
     controller: "analyticsCtrl"
    })
    .when("/integrations", {
     templateUrl: "integrations.html",
    })
    .when("/", {
     templateUrl: "indexMenu.html",
    })
    .when("/attacks-data", {
     templateUrl: "attackList.html",
     controller: "ListCtrl"
    })
    .when("/attacks-data/:country/:city/:date", {
     templateUrl: "attackEdit.html",
     controller: "EditCtrl"
    })
    .when("/homicide-reports-data", {
     templateUrl: "homicideDataList.html",
     controller: "homicideDataListCtrl"
    })
    .when("/homicide-reports-data/:state/:city/:year/:month", {
     templateUrl: "homicideDataEdit.html",
     controller: "homicideDataEditCtrl"
    })
    .when("/global-terrorism-data", {
     templateUrl: "globalTerrorismList.html",
     controller: "globalTerrorismListCtrl"
    })
    .when("/global-terrorism-data/:country_txt/:city/:iyear/:imonth/:iday", {
     templateUrl: "globalTerrorismEdit.html",
     controller: "globalTerrorismEditCtrl"
    })
    .when("/global-terrorism-data/analytics", {
     templateUrl: "vistasMiguelAngel.html",
     controller: "vistasMiguelAngelCtrl"
    })
    .when("/homicide-reports-data/analytics", {
     templateUrl: "vistasFranciscoJesus.html",
     controller: "vistasFranciscoJesusCtrl"
    })
    .when("/attacks-data/analytics", {
     templateUrl: "vistasIsmael.html",
     controller: "vistasIsmaelCtrl"
    })
    .when("/global-terrorism-data/integrations", {
     templateUrl: "vistaIntegracionMiguelAngel.html",
     controller: "vistaIntegracionMiguelAngelCtrl"
    })
    .when("/attacks-data/integrations", {
     templateUrl: "vistaIntegracionIsmael.html",
     controller: "vistaIntegracionIsmaelCtrl"
    })
    .when("/homicide-reports-data/integrations", {
     templateUrl: "vistaIntegracionFran.html",
     controller: "vistaIntegracionFranCtrl"
    })
    .when("/about", {
     templateUrl: "videos.html"
    });
  });
 