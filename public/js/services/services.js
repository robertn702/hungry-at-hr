angular.module('hungry.services', [])

.factory('Businesses', function ($http) {
  var businesses = {};
  var markers = {};

  var getBusinesses = function (filterNum) {
    $http.get('/business').
      success(function(data, status, headers, config) {
        businesses.list = filterBusinesses(data, filterNum);
        markers.array = getMarkers(businesses.list);
      }).
      error(function(data, status, headers, config) {
        console.error('error getting business data');
      });
  };

  var filterBusinesses = function(data, filterNum) {
    var businessArray = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].filter.indexOf(filterNum) !== -1)
        businessArray.push(data[i]);
    }
    return businessArray;
  };

  // creates and returns array of business coordinates
  var getMarkers = function(businesses) {
    var markersArray = [];
    var hackReactor = {
      id: 0,
      latitude: 37.783748,
      longitude: -122.409046,
      google_id: 'mothership',
      title: 'Hack Reactor'
    };

    markersArray.push(hackReactor);

    for (var i = 0; i < businesses.length; i++) {
      markersArray.push({
        id: i + 1,
        latitude: businesses[i].coordinates.latitude,
        longitude: businesses[i].coordinates.longitude,
        google_id: businesses[i].google_id,
        title: businesses[i].business_name
      });
    }
    return markersArray;
  };

  return {
    getBusinesses: getBusinesses,
    businesses: businesses,
    markers: markers
  };
})
