angular.module('hungry.services', [])

.factory('Businesses', function ($http) {
  var businesses = {};

  var getBusinesses = function (filterNum) {
    $http.get('/business').
      success(function(data, status, headers, config) {
        businesses.eat = filterBusinesses(data, '0');
        businesses.drink = filterBusinesses(data, '1');
        businesses.study = filterBusinesses(data, '2');
        businesses.list = setBusinessList(businesses, filterNum);
        businesses.markers = getMarkers(businesses.list);
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

  // changes business list depending on the filter
  var setBusinessList = function(businesses, filterNum) {
    switch (filterNum) {
      case '0':
        return businesses.Eat;
        break;
      case '1':
        return businesses.Drink;
        break;
      case '2':
        return businesses.Study;
        break;
    }
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
    businesses: businesses
  };
})
