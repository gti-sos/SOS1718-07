  /* global angular */


  angular
      .module("homicideDataApp")
      .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
          console.log("List Ctrl initialized!");
          var api = "/api/v1/homicide-reports-data";


          $scope.addHomicide = function() {
              $http.post(api, $scope.newHomicide).then(function(response) {
                  $scope.status = "Status: " + response.status;
                  getHomicide();
              });
          }

          $scope.deleteHomicide = function(state, city, year, month) {
              $http.delete(api + "/" + state + "/" + city + "/" + year + "/" + month).then(function(response) {
                  $scope.status = "Status: " + response.status;
                  getHomicide();

              });
          }
          
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
  