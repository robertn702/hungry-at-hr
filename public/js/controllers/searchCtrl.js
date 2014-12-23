angular.module('hungry.search', [])

.controller('SearchController', function($scope, $http) {
  $scope.markers = [];
  var getData = function() {
    $http.get('/business').
      success(function(data, status, headers, config) {
        $scope.data = data;
        for (var i = 0; i < data.length; i++) {
          $scope.markers.push({
          id: i,
          latitude: data[i].coordinates.latitude,
          longitude: data[i].coordinates.longitude
        });
        }
      }).
      error(function(data, status, headers, config) {
        console.error('error');
      });
  };

  var init = function() {
    getData();
  };
  init();

  $scope.map = {
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 14
  };
});
