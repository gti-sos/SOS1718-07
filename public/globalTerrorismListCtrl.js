/* global angular */
/* global location */
//import 'rxjs/add/operator/catch';


angular.module("globalTerrorismApp").controller("globalTerrorismListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("list Ctrl inicialized!");
    var api = "api/v1/global-Terrorism-Data";

    $scope.addData = function() {
            $http.post(api, $scope.newData).then(function doneFilter(response) {
                $scope.globalTerrorismData = response.data;
                $scope.status = "Status: " + response.status;

                if (response.status === 201) {
                    window.alert("El dato se ha insertado con exito, gracias! ;)");
                }
                
                getGlobalTerrorismData();
            }, function failFilter(response){
                $scope.status = "Status: " + response.status;
                if(response.status == 400){
                    window.alert("Debes introducir todos los campos requeridos, gracias! ;)");
                    location.reload();
                }
                else if(response.status == 409){
                    window.alert("El recurso ya existe, gracias! ;)");
                    location.reload();
                }
                else{
                    window.alert("Ha ocurrido un error inesperado, lo siento! :(");
                }
                 
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
