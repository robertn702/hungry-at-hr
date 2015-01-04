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
      longitude: data[i].coordinates.longitude,
      google_id: data[i].google_id
      });
    }
    return markersArray;
  };

  init();

  $scope.markerEvents = {
    mouseover: function(marker) {
      console.log('mouseenter');
      console.log('marker: ', marker);
      angular.element(document.querySelector('#list_' + marker.model.google_id)).addClass('highlighted');
    },
    mouseout: function(marker) {
      angular.element(document.querySelector('#list_' + marker.model.google_id)).removeClass('highlighted');
      console.log('mouseleave');
    },
    click: function(marker) {
      console.log('stateparams filternum: ', $stateParams.filterNum);
      $state.go('home.business', { google_id: marker.model.google_id, filterNum: $stateParams.filterNum });
    }
  };

  // $scope.markerOptions = {
  //   place
  // }


  $scope.map = {
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 14
  };
});
