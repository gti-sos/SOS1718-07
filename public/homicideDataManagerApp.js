  /* global angular */
  angular
    .module("homicideDataApp", ["ngRoute"])
    .config(function($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "homicideDataList.html",
          controller: "homicideDataListCtrl"
        }).when("/homicide-reports-data/:state/:city/:year/:month", {
          templateUrl: "homicideDataEdit.html",
          controller: "homicideDataEditCtrl"
        });
    });
  