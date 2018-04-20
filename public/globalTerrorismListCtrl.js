/* global angular */

angular.module("globalTerrorismApp").controller("globalTerrorismListCtrl", ["$scope","$http", function($scope,$http){
    console.log("list Ctrl inicialized!");
    var api = "api/v1/global-Terrorism-Data";
    
    $scope.addData = function(){
        $http.post(api,$scope.newData).then(function(response){
            $scope.globalTerrorismData = response.data;
            $scope.status = "Status: " + response.status;
            getGlobalTerrorismData();
        });
    }
    
    function getGlobalTerrorismData(){
        $http.get(api).then(function(response){
            $scope.globalTerrorismData = response.data;
        });
    }
    getGlobalTerrorismData();
}])