angular.module('hungry.business', [])

.controller('BusinessController', function($scope, $http) {
  $scope.init = function() {
    $http.get('/one-business').
      success(function(data, status, headers, config) {
        $scope.businesses = data;
      }).
      error(function(data, status, headers, config) {
        console.error('error getting single business info');
      });
    // FILTER BY ONE-BUSINESS ID!!!
    $http.get('/reviews').
      success(function(data, status, headers, config) {
        $scope.business
      }).
      error(function(data, status, headers, config) {
        console.error('error getting reviews');
      });
  };
  $scope.init();
});