angular.module('hungry.home', [])

.controller('HomeController', function($scope, $http) {
  var getData = function() {
    $http.get('/business').
      success(function(data, status, headers, config) {
        $scope.data = data;
        console.log($scope.data);
      }).
      error(function(data, status, headers, config) {
        console.error('error getting data');
      });
  };

  $scope.init = function() {
    getData();
  };
  $scope.init();
  $scope.searchItems = ['Eat', 'Drink', 'Study'];
});
