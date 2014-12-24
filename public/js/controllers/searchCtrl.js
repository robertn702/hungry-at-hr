angular.module('hungry.search', [])

.controller('SearchController', function($scope, $state, $http, $stateParams) {
  // $scope.markerEvents = {};

  var init = function() {
    $scope.markers = getMarkers($scope.data);
  };

  // creates and returns array of business coordinates
  var getMarkers = function(data) {
    var markersArray = [];
    for (var i = 0; i < data.length; i++) {
      markersArray.push({
      id: i,
      latitude: data[i].coordinates.latitude,
      longitude: data[i].coordinates.longitude
      });
    }
    return markersArray;
  };

  init();


  $scope.map = {
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 14
  };
});
