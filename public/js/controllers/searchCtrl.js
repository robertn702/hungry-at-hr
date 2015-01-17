angular.module('hungry.search', [])

.controller('SearchController', function($scope, $state, $http, $stateParams) {
  $scope.markerControl = {};
  $scope.business_list;

  var init = function() {
    // default map setting (Hack Reactor in center)
    $scope.map = {
      center: { latitude: 37.783748, longitude: -122.409046 },
      zoom: 14
    };

    // gets business data
    getData();
  };

  // filters businesses based off of their filter value
  var filterBusinesses = function(businesses, filterNum) {
    var businessArray = [];
    // console.log('businesses: ', businesses);
    for (var i = 0; i < businesses.length; i++) {
      if (businesses[i].filter.indexOf(filterNum) !== -1) {
        businessArray.push(businesses[i]);
      }
    }
    return businessArray;
  };

  // changes business list depending on the filter
  var setBusinessList = function(filterNum) {
    switch (filterNum) {
      case '0':
        // console.log('case 0');
        return $scope.placesToEat;
        break;
      case '1':
        // console.log('case 1');
        return $scope.placesToDrink;
        break;
      case '2':
        // console.log('case 2');
        return $scope.placesToStudy;
        break;
    }
  };

  // makes http request to get array of businesses
  var getData = function() {
    $http.get('/business').
      success(function(data, status, headers, config) {
        $scope.placesToEat = filterBusinesses(data, '0');
        $scope.placesToDrink = filterBusinesses(data, '1');
        $scope.placesToStudy = filterBusinesses(data, '2');
        $scope.business_list = setBusinessList($stateParams.filterNum);
        $scope.markers = getMarkers($scope.business_list);
      }).
      error(function(data, status, headers, config) {
        console.error('error getting business data');
      });
  };

  // creates and returns array of business coordinates
  var getMarkers = function(data) {
    var markersArray = [];
    var hackReactor = {
      id: 0,
      latitude: 37.783748,
      longitude: -122.409046,
      google_id: 'mothership',
      title: 'Hack Reactor'
    };

    markersArray.push(hackReactor);

    for (var i = 0; i < data.length; i++) {
      markersArray.push({
        id: i + 1,
        latitude: data[i].coordinates.latitude,
        longitude: data[i].coordinates.longitude,
        google_id: data[i].google_id,
        title: data[i].business_name
      });
    }
    return markersArray;
  };

  init();

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
    var id = listEvent.target.id.slice(5); // removes 'list_' from id to get the google_id
    var markers = $scope.markerControl.getGMarkers();

    var allButSelectedIsNotHidden = function(isVisible) {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].model.google_id !== id && markers[i].model.google_id !== 'mothership') {
          markers[i].setVisible(isVisible);
        }
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
