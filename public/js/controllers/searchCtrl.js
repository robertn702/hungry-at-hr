angular.module('hungry.search', [])

.controller('SearchController', function($scope, $state, $http, $stateParams) {
  $scope.business_list

  var init = function() {
    $scope.map = {
      center: { latitude: 37.783748, longitude: -122.409046 },
      zoom: 14
    };

    $scope.markerControl = {};

    switch ($stateParams.filterNum) {
      case '0':
        console.log('case 0');
        $scope.business_list = $scope.placesToEat;
        break;
      case '1':
        console.log('case 1');
        $scope.business_list = $scope.placesToDrink;
        break;
      case '2':
        console.log('case 2');
        $scope.business_list = $scope.placesToStudy;
        break;
    }

    $scope.markers = getMarkers($scope.business_list);
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

  // REFERENCE
  // $scope.map.markers.push({
  //     id: value[3],
  //     latitude: angular.fromJson(value[1]),
  //     longitude: angular.fromJson(value[2]),
  //     icon: iconimg,
  //     title : value[0],
  //     options: {
  //         labelContent : dist + '<br />'+$filter('date')(date,'d-M'),
  //         labelAnchor: "36 61",
  //         labelClass: 'labelClass',
  //         labelStyle: newstyle,
  //         labelInBackground: false
  //     }
  //  });

  init();

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
    }

    var map = angular.element(document.querySelector('.angular-google-map'));
  };

  // $scope.markerOptions = {
  //   place
  // }


});
