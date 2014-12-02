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
    $scope.stars = $scope.businesses[idx].stars;
    $scope.review_count = $scope.businesses[idx].review_count;
    $scope.business_name = $scope.businesses[idx].business_name;
    $scope._id = $scope.businesses[idx]._id;
    $scope.averageStars = $scope.stars / $scope.review_count;
  };
});