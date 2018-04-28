/* global angular */

angular
    .module("TerrorismManagerApp")
    .controller("homicideDataEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http,$routeParams,$location) {
        console.log("edit Ctrl inicialized!");
        var dataUrl = "api/v1/homicide-reports-data/" + $routeParams.state + "/" + $routeParams.city + "/" + $routeParams.year + "/" + $routeParams.month;


        $http.get(dataUrl).then(function(response) {
            $scope.updatedHomicide = response.data;
        });

        $scope.updateHomicide = function() {
            $http.put(dataUrl, $scope.updatedHomicide).then(function doneFilter(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/");
                window.alert("El recurso se ha editado con exito, gracias! ;)");
            }, function failFilter(response) {
                if (response.status == 400) {
                    window.alert("Debes respetar los campos obligatorios, país, ciudad y fecha, gracias! ;)");
                }
            });
        };


    }]);
