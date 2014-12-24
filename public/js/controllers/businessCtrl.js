angular.module('hungry.business', [])

.controller('BusinessController', function($scope, $http, $state, $stateParams) {
  var init = function() {
    // $http.get('/review').
    //   success(function(data, status, headers, config) {
    //     $scope.reviews = data;
    //   }).
    //   error(function(data, status, headers, config) {
    //     console.error('error getting reviews');
    //   });
    // $scope.resetForm();
    $scope.business_data = getBusiness($stateParams.google_id);
    if ($state.is('home.business')) {
      $state.go('home.business.reviews');
    }
  };

  var getBusiness = function(id) {
    for (var i = 0; i < $scope.data.length; i++) {
      if ($scope.data[i].google_id === id) {
        return $scope.data[i];
      }
    }
  };

  init();

  $scope.marker = [{
    id: 0,
    latitude: $scope.business_data.coordinates.latitude,
    longitude: $scope.business_data.coordinates.longitude
  }];

  $scope.map = {
    center: {
      latitude: $scope.business_data.coordinates.latitude,
      longitude:  $scope.business_data.coordinates.longitude
    },
    zoom: 16
  };
});
