angular.module('hungry.business', [])

.controller('BusinessController', function($scope, $http, $state, $stateParams, Businesses) {
  angular.extend($scope, Businesses);

  // automatically shows the /reviews view when the business page loads
  if ($state.is('home.business')) {
    $state.go('home.business.reviews');
  }

  // map data for the minimap on the business page
  $scope.map = {
    // default center is set at Hack Reactor until get request returns
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 16
  };

  // creates the marker for the minimap on the business page
  $scope.marker = [{id: 0}];

  // searches through the array of businesses and returns the busines object
  $http.get('/business/' + $stateParams.google_id).
  success(function(data, status, headers, config) {
    $scope.business_data = data;
    $scope.marker[0].latitude = $scope.map.center.latitude = data.coordinates.latitude;
    $scope.marker[0].longitude = $scope.map.center.longitude = data.coordinates.longitude;
  }).
  error(function(data, status, headers, config) {
    console.error('error getting business');
  });

  $scope.backToMap = function() {
    $state.go('home.search', { filterNum: $stateParams.filterNum });
  };


});
