angular.module('hungry.business', [])

.controller('BusinessController', function($scope, $http, $state, $stateParams) {
  var init = function() {
    // gets the business object that matches the google_id
    $scope.business_data = getBusiness($stateParams.google_id);
    console.log($scope.business_data);

    // automatically shows the /reviews view when the business page loads
    if ($state.is('home.business')) {
      $state.go('home.business.reviews');
    }
  };

  // searches through the array of businesses and returns the busines object
  var getBusiness = function(id) {
    for (var i = 0; i < $scope.data.length; i++) {
      if ($scope.data[i].google_id === id) {
        return $scope.data[i];
      }
    }
  };

  init();

  $scope.backToMap = function() {
    $state.go('home.search', { filterNum: $stateParams.filterNum });
  };

  var business_latitude = $scope.business_data.coordinates.latitude;
  var business_longitude = $scope.business_data.coordinates.longitude;

  // creates the marker for the minimap on the business page
  $scope.marker = [{
    id: 0,
    latitude: business_latitude,
    longitude: business_longitude
  }];

  // mapd data for the minimap on the business page
  $scope.map = {
    center: {
      latitude: business_latitude,
      longitude: business_longitude
    },
    zoom: 16
  };
});
