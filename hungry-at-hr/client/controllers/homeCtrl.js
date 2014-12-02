angular.module('hungry.list', [])

.controller('HomeController', function($scope, $http) {
  $scope.init = function() {
    $http.get('/business').
      success(function(data, status, headers, config) {
        $scope.businesses = data;
      }).
      error(function(data, status, headers, config) {
        console.error('error');
      });
  };
  $scope.init();

  $scope.setIndex = function(idx) {
    $scope.index = idx;
  };
});