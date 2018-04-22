  /* global angular */
  angular
      .module("homicideDataApp", ["ngRoute"])
      .config(function ($routeProvider){
          $routeProvider
                .when("/",{
                    templateUrl : "homicideDataList.html",
                    controller : "ListCtrl"
                });
      });
  