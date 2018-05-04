/* global angular */

angular.module("TerrorismManagerApp").controller("globalTerrorismEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("edit Ctrl inicialized!");
    var dataUrl = "api/v1/global-Terrorism-Data/" + $routeParams.country_txt + "/" + $routeParams.city + "/" + $routeParams.iyear + "/" + $routeParams.imonth + "/" +
        $routeParams.iday;

    $http.get(dataUrl).then(function(response) {
        $scope.updatedData = response.data;
    });

    $scope.updateData = function() {
        $http.put(dataUrl, $scope.updatedData).then(function doneFilter(response) {
            //$scope.status = "Status: " + response.status;
            $location.path("/global-terrorism-data");
            window.alert("El recurso se ha editado con exito, gracias! ;)");
        }, function failFilter(response) {
            if (response.status == 400) {
                window.alert("Debes respetar los campos obligatorios, país, ciudad y fecha, gracias! ;)");
            }
        });
    };

}]);
