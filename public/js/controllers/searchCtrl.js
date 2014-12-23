angular.module('hungry.search', [])

.controller('SearchController', function($scope, $http) {
  $scope.init = function() {};
  $scope.init();
  $scope.map = {
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 14
  };
});
