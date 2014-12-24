angular.module('hungry.search', [])

.controller('SearchController', function($scope, $state, $http, $stateParams) {
  $scope.markers = [];
  $scope.markerEvents = {};

  var init = function() {
    for (var i = 0; i < $scope.data.length; i++) {
      $scope.markers.push({
      id: i,
      latitude: $scope.data[i].coordinates.latitude,
      longitude: $scope.data[i].coordinates.longitude
      });
    }
  };
  init();
  $scope.map = {
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 14
  };
});
