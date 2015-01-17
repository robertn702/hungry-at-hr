angular.module('hungry.search', [])

.controller('SearchController', function($scope, $state, $http, $stateParams, Businesses) {
  angular.extend($scope, Businesses);
  // gets business data (takes in filter num)
  $scope.getBusinesses($stateParams.filterNum);
  $scope.markerControl = {};

  // default map setting (Hack Reactor in center)
  $scope.map = {
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 14
  };


  // list of marker events
  $scope.markerEvents = {
    mouseover: function(marker) {
      angular.element(document.querySelector('#list_' + marker.model.google_id)).addClass('highlighted');
    },
    mouseout: function(marker) {
      angular.element(document.querySelector('#list_' + marker.model.google_id)).removeClass('highlighted');
    },
    click: function(marker) {
      $state.go('home.business', { google_id: marker.model.google_id, filterNum: $stateParams.filterNum });
    }
  };

  //
  $scope.businessListEventHandler = function(listEvent) {
    // removes 'list_' from id to get the google_id
    var id = listEvent.target.id.slice(5);
    var markers = $scope.markerControl.getGMarkers();

    var allButSelectedIsNotHidden = function(isVisible) {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].model.google_id !== id && markers[i].model.google_id !== 'mothership')
          markers[i].setVisible(isVisible);
      }
    };

    switch (listEvent.type) {
      case "mouseover":
        allButSelectedIsNotHidden(false);
        break;
      case "mouseleave":
        allButSelectedIsNotHidden(true);
        break;
    };

    var map = angular.element(document.querySelector('.angular-google-map'));
  };
});
