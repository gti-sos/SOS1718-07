/* global angular */
/* global location */

angular
    .module("AttackManagerApp")
    .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/attacks-data";


        $scope.addAttack = function() {
            $http.post(api, $scope.newAttack).then(function doneFilter(response) {
                    $scope.attacks = response.data;
                    $scope.status = "Status: " + response.status;

                   /* if (response.status === 201) {
                        window.alert("El dato se ha insertado con exito, gracias!");
                    }*/
                    getAttack();
                }, function failFilter(response){
                $scope.status = "Status: " + response.status;
                if(response.status == 400){
                    window.alert("Debes introducir todos los campos requeridos, gracias!");
                    location.reload();
                }
                else if(response.status == 409){
                    window.alert("El recurso ya existe, gracias!");
                    location.reload();
                }
                else{
                    window.alert("Ha ocurrido un error inesperado, lo siento!");
                }
                 
            });
        };

        $scope.deleteAllAttacks = function() {
            $http.delete(api).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttack();
            });
        };

        $scope.deleteAttack = function(country, city, date) {
            $http.delete(api + "/" + country + "/" + city + "/" + date).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttack();
            });
        };

        function getAttack() {
            $http.get(api).then(function(response) {
                $scope.attacks = response.data;
                getAttack();
            });
        }

        getAttack();

    }]);
