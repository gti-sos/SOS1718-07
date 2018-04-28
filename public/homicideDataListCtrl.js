  /* global angular */
  /* global location */


  angular
    .module("TerrorismManagerApp")
    .controller("homicideDataListCtrl", ["$scope", "$http", function($scope, $http) {
      console.log("List Ctrl initialized!");
      var api = "/api/v1/homicide-reports-data";


      $scope.addHomicide = function() {
        $http.post(api, $scope.newHomicide).then(function doneFilter(response) {
          $scope.homicides = response.homicide;
          $scope.status = "Status: " + response.status;

          if (response.status === 201) {
            window.alert("El dato se ha insertado con exito, gracias! ;)");
          }

          getHomicide();
        }, function failFilter(response) {
          $scope.status = "Status: " + response.status;
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

      $scope.deleteHomicide = function(state, city, year, month) {
        $http.delete(api + "/" + state + "/" + city + "/" + year + "/" + month).then(function(response) {
          $scope.status = "Status: " + response.status;
          getHomicide();
        });
      };

      $scope.deleteAllHomicide = function() {
        $http.delete(api).then(function(response) {
          $scope.status = "Status: " + response.status;
          getHomicide();
        });
      };

      function getHomicide() {
        $http.get(api).then(function(response) {
          $scope.homicides = response.data;
        });
      }

      getHomicide();

    }]);
  