  /* global angular */
  /* global location */


  angular
    .module("TerrorismManagerApp")
    .controller("homicideDataListCtrl", ["$scope", "$http", function($scope, $http) {
      console.log("List Ctrl initialized!");
      var api = "/api/v1/homicide-reports-data";
      var limit = 10;
      var offset = 0;
      var paginacionString = "";
      
      
      $scope.loadInitialData = function() {
            $http.get(api + "/loadInitialData").then(function(response) {
             //   $scope.status = "Status: " + response.status;
                if (response.status === 201) {
                    window.alert("Datos insertados con exito, gracias!");
                }
                else {
                    window.alert("It is unnecessary to insert data, the database is not empty");
                }
                getHomicides();
            });
        };


      $scope.addHomicide = function() {
        $http.post(api, $scope.newHomicide).then(function doneFilter(response) {
          $scope.homicides = response.homicide;
       //   $scope.status = "Status: " + response.status;

          if (response.status === 201) {
            window.alert("El dato se ha insertado con exito, gracias! ;)");
          }

          getHomicides();
        }, function failFilter(response) {
    //      $scope.status = "Status: " + response.status;
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
   //       $scope.status = "Status: " + response.status;
          if (response.status === 200) {
                    window.alert("Ha borrado un dato de la tabla");
                }
          getHomicides();
        });
      };

      $scope.deleteAllHomicide = function() {
        $http.delete(api).then(function(response) {
   //       $scope.status = "Status: " + response.status;
            if (response.status === 200) {
                    window.alert("Se han borrado todos los datos de la tabla");
                }
          getHomicides();
        });
      };

/*
      function getHomicide() {
        $http.get(api).then(function(response) {
          $scope.homicides = response.data;
        });
      }

      getHomicide();
*/


  /*--------------------Búsqueda--------------------*/
        $scope.searchHomicide = function() {
            $http.get(api + "?from=" + $scope.newHomicide.from + "&to=" + $scope.newHomicide.to).then(function doneFilter(response) {
                $scope.data = JSON.stringify(response.data, null, 2);
                $scope.homicides = response.data;
                //$scope.status = "Status: " + response.status;

                if (response.status === 200) {
                    window.alert("Hemos encontrado datos en tu búsqueda");
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
            $location.path("/homicide-reports-data");
        };
        
         function getHomicides() {
            paginacionString = "&limit=" + limit + "&offset=" + offset;
            $http.get(api + "?" + paginacionString).then(function(response) {
                $scope.homicides = response.data;
            });
        }

        getHomicides();
        
        
        $scope.siguientePag = function() {
            offset += limit;
            getHomicides();
        };

        $scope.anteriorPag = function() {
            offset -= limit;
            getHomicides();
        };
    }]);
  