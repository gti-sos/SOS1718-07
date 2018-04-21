/* global angular */

angular
    .module("AttackManagerApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Ctrl initialized!");
        var contactUrl = "/api/v1/attacks-data/" + $routeParams.name;


        $http.get(contactUrl).then(function(response) {
            $scope.updatedContact = response.data;
        });

        $scope.updateContact = function() {
            $http.put(contactUrl, $scope.updatedContact).then(function(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/");
            });
        };
    }]);
