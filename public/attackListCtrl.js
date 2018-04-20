/* global angular */

angular
    .module("indexAttack")
    .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/attacks-data";


        $scope.addAttack = function() {
            $http.post(api, $scope.newAttack).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttack();
            }, function() {
                if ($scope.length != 5) {
                    $scope.status = "Error 400: debe completar todos los campos";
                }
                else {
                    $scope.status = "Error 409: el ataque ya existe";
                }
            });
        };

        $scope.deleteAttack = function(country, date, city) {
            $http.delete(api + "/" + country + "/" + date + "/" + city).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttack();
            });
            getAttack();
        };

        $scope.deleteAttack = function() {
            console.log("all attacks will be delete");
            $http.delete(api + "/").then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttack();
            });
            getAttack();
        };


        function getAttack() {
            $http.get(api).then(function(response) {
                $scope.attack= response.data;
            });
        }

        getAttack();

    }]);
