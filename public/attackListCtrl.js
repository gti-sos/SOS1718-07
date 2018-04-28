/* global angular */
/* global location */

angular
    .module("TerrorismManagerApp")
    .controller("ListCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/attacks-data";
        var limit = 10;
        var offset = 0;
        var paginacionString = "";

        $scope.loadInitialData = function() {
            $http.get(api + "/loadInitialData").then(function(response) {
                $scope.status = "Status: " + response.status;
                if (response.status === 201) {
                    window.alert("Datos insertados con exito, gracias!");
                }
                else {
                    window.alert("It is unnecessary to insert data, the database is not empty");
                }
                getAttacks();
            });
        };

        $scope.addAttack = function() {
            $http.post(api, $scope.newAttack).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                $scope.attacks = response.data;

                if (response.status === 201) {
                    window.alert("El dato se ha insertado con exito, gracias!");
                }
                getAttacks();
            }, function errorCallback(response) {
                $scope.status = "Status: " + response.status;
                if (response.status == 400) {
                    window.alert("Debes introducir todos los campos requeridos, gracias!");
                    location.reload();
                }
                else if (response.status == 409) {
                    window.alert("El recurso ya existe, gracias!");
                    location.reload();
                }
                else {
                    window.alert("Ha ocurrido un error inesperado, lo siento!");
                }

            });
        };

        $scope.deleteAllAttacks = function() {
            $http.delete(api).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttacks();
            });
        };

        $scope.deleteAttack = function(country, city, date) {
            $http.delete(api + "/" + country + "/" + city + "/" + date).then(function(response) {
                $scope.status = "Status: " + response.status;
                getAttacks();
            });
        };

        /*--------------------Antiguo getAttack--------------------*/
        /*  function getAttack() {
              $http.get(api).then(function(response) {
                  $scope.attacks = response.data;

              });
          }*/

        /*--------------------Búsqueda--------------------*/
        $scope.searchAttack = function() {
            $http.get(api + "?from=" + $scope.newAttack.from + "&to=" + $scope.newAttack.to).then(function doneFilter(response) {
                $scope.data = JSON.stringify(response.data, null, 2);
                $scope.attacks = response.data;
                $scope.status = "Status: " + response.status;

                if (response.status === 200) {
                    window.alert("Search successfull");
                }

            }, function failFilter(response) {
                if (response.status == 400) {
                    window.alert("Bad Request");
                    location.reload();
                }
                if (response.status == 404) {
                    window.alert("There is no data with those results");
                }
            });

        };

        $scope.return = function() {
            $location.path("/attacks-data");
        };

        /*--------------------Paginación--------------------*/

        function getAttacks() {
            paginacionString = "&limit=" + limit + "&offset=" + offset;
            $http.get(api + "?" + paginacionString).then(function(response) {
                $scope.attacks = response.data;
            });
        }

        getAttacks();

        $scope.siguientePag = function() {
            offset += limit;
            getAttacks();
        };

        $scope.anteriorPag = function() {
            offset -= limit;
            getAttacks();
        };

    }]);
