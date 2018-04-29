/* global angular */

angular
    .module("TerrorismManagerApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Ctrl initialized!");
        var attackUrl = "/api/v1/attacks-data/" + $routeParams.country + "/" + $routeParams.city + "/" + $routeParams.date;


        $http.get(attackUrl).then(function(response) {
            $scope.updatedAttack = response.data;
        });

        $scope.updateAttack = function() {
            $http.put(attackUrl, $scope.updatedAttack).then(function doneFilter(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/");
                window.alert("El recurso se ha editado con exito, gracias!");
            }, function failFilter(response) {
                if (response.status == 400) {
                    window.alert("Debes respetar los campos obligatorios, país, ciudad y fecha, gracias!");
                }
            });
        };
        
        $scope.return = function(){
            $location.path("/attacks-data");
        };
    }]);
