/* global angular */

angular.module("globalTerrorismApp").controller("globalTerrorismListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("list Ctrl inicialized!");
    var api = "api/v1/global-Terrorism-Data";

    $scope.addData = function() {
        $http.post(api, $scope.newData).then(function(response) {
            console.log(response.data);
            
            $scope.globalTerrorismData = response.data;
            $scope.status = "Status: " + response.status;
            if (response.status === 201) {
                window.alert("El dato se ha introducido correctamente");
            }
            else if(response.status === 209) {
                window.alert("El dato no se ha introducido correctamente");
            }
            getGlobalTerrorismData();
        });
    };

    $scope.deleteData = function(country, city, year, month, day) {
        $http.delete(api + "/" + country + "/" + city + "/" + year + "/" + month + "/" + day).then(function(response) {
            $scope.status = "Status: " + response.status;
            getGlobalTerrorismData();
        });
    };

    $scope.deleteAllData = function() {
        $http.delete(api).then(function(response) {
            $scope.status = "Status: " + response.status;
            getGlobalTerrorismData();
        });
    };

    function getGlobalTerrorismData() {
        $http.get(api).then(function(response) {
            $scope.globalTerrorismData = response.data;
        });
    }
    getGlobalTerrorismData();
}]);
