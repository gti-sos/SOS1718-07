/* global angular */
/* global location */
//import 'rxjs/add/operator/catch';


angular.module("TerrorismManagerApp").controller("globalTerrorismListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("list Ctrl inicialized!");
    var api = "api/v1/global-Terrorism-Data";
    var limit = 10;
    var offset = 0;
    var paginacionString = "";


    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            if (response.status === 201) {
                window.alert("Datos insertados con exito, gracias!");
            }
            else {
                window.alert("No es necesario añadir datos, ya hay algunos, gracias! ;)");
            }
            getGlobalTerrorismData();
        });
    };


    $scope.addData = function() {
        $http.post(api, $scope.newData).then(function doneFilter(response) {
            $scope.globalTerrorismData = response.data;
            //$scope.status = "Status: " + response.status;

            if (response.status === 201) {
                window.alert("El dato se ha insertado con exito, gracias! ;)");
            }

            getGlobalTerrorismData();
        }, function failFilter(response) {
            //$scope.status = "Status: " + response.status;
            if (response.status == 400) {
                window.alert("Debes introducir todos los campos requeridos, gracias! ;)");
                location.reload();
            }
            else if (response.status == 409) {
                window.alert("El recurso ya existe, gracias! ;)");
                location.reload();
            }
            else {
                window.alert("Ha ocurrido un error inesperado, lo siento! :(");
            }

        });


    };

    $scope.deleteData = function(country, city, year, month, day) {
        $http.delete(api + "/" + country + "/" + city + "/" + year + "/" + month + "/" + day).then(function(response) {
            //$scope.status = "Status: " + response.status;
            getGlobalTerrorismData();
        });
    };

    $scope.deleteAllData = function() {
        $http.delete(api).then(function(response) {
            //$scope.status = "Status: " + response.status;
            getGlobalTerrorismData();
        });
    };

    /*
    Antiguo getGlobalTerrorismData()
    function getGlobalTerrorismData() {
        $http.get(api).then(function(response) {
            $scope.globalTerrorismData = response.data;
        });
    }
    getGlobalTerrorismData();
    */
    function getGlobalTerrorismData() {
        paginacionString = "&limit=" + limit + "&offset=" + offset;
        $http.get(api + "?" + paginacionString).then(function(response) {
            $scope.globalTerrorismData = response.data;
        });
    }

    getGlobalTerrorismData();

    $scope.searchGlobalTerrorismData = function() {
        $http.get(api + "?from=" + $scope.newGlobalTerrorism.from + "&to=" + $scope.newGlobalTerrorism.to).then(function doneFilter(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.globalTerrorismData = response.data;
            //$scope.status = "Status: " + response.status;

            if (response.status === 200) {
                window.alert("Hemos encontrado datos en tu búsqueda, gracias! :)");
            }

        }, function failFilter(response) {
            if (response.status == 400) {
                window.alert("Bad Request");
                location.reload();
            }
            if (response.status == 404) {
                window.alert("No hay datos con los parámetros introducidos, lo siento! :(");
            }
        });

    };
    
    $scope.siguientePag = function() {
            offset += limit;
            getGlobalTerrorismData();
        };

        $scope.anteriorPag = function() {
            offset -= limit;
            getGlobalTerrorismData();
        };


}]);
