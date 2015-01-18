angular.module('hungry.add-business', [])

.controller('AddBusinessController', function($scope, $http, $state, $stateParams, Businesses) {
  angular.extend($scope, Businesses);
  $scope.business_data = {};
  $scope.address = [];
  $scope.details = {
    geometry: {
      location: {
        k: 37.783748,
        D: -122.409046
      }
    }
  };



  // $scope.inputOptions = {
  //   types: 'restaurant|cafe|bar',
  //   country: 'us',
  //   watchEnter: true
  // };

  $scope.inputOptions = {
    types: 'geocode',
    country: 'us',
    watchEnter: true
  };

  $scope.map = {
    center: {
      latitude: $scope.details.geometry.location.k,
      longitude: $scope.details.geometry.location.D
    },
    zoom: 16
  };

  $scope.backToMap = function() {
    $state.go('home.search', { filterNum: $stateParams.filterNum });
  };

  // checks if business is a duplicate
  $scope.isDuplicate = function(googleId, keyEvent) {
    $http.get('/business/' + googleId).
      success(function(data, status, headers, config) {
        if (data) {
          $scope.disable = true;
        } else {
          $scope.disable = false;
        }
      }).
      error(function(data, status, headers, config) {
        console.error('error getting business data');
      });
  };


  $scope.submitData = function(details) {
    $scope.business_data = formatData(details);

    $http.post('/business', $scope.business_data).
      success(function(data, status, headers, config) {
        console.log('added business');
        $state.go('home.business', { google_id: data.google_id, filterNum: $stateParams.filterNum });
      }).
      error(function(data, status, headers, config) {
        console.log('error adding business', status);
      });
  };

  var formatAddress = function(address) {
    console.log('formatted address: ', address);
    var splitAddress = address.split(',');
    var address = [];
    address[0] = splitAddress[0];
    address[1] = splitAddress[1] + ',' + splitAddress[2];
    return address;
  };

  var formatHours = function(openClose) {
    var lunchStart = 1230;
    var lunchEnd = 1330;
    var dinnerStart = 1730;
    var dinnerEnd = 1830;

    var hours = {};
    hours.lunch = [];
    hours.dinner = [];

    for (var i = 0; i < openClose.length; i++) {
      var dayOpen = openClose[i].open.day;
      var dayClose = openClose[i].close.day;
      var openTime = parseInt(openClose[i].open.time, 10);
      var closeTime = parseInt(openClose[i].close.time, 10);

      // check if open for lunch
      if (lunchStart >= openTime && (lunchEnd <= closeTime || dayOpen < dayClose)) {
        hours.lunch[dayOpen] = true;
      } else {
        hours.lunch[dayOpen] = false;
      }
      // check if open for dinner
      if (dinnerStart >= openTime && (dinnerEnd <= closeTime || dayOpen < dayClose)) {
        hours.dinner[dayOpen] = true;
      } else {
        hours.dinner[dayOpen] = false;
      }

      if (!hours.lunch[i]) { hours.lunch[i] = false; }
      if (!hours.dinner[i]) { hours.dinner[i] = false; }
    }
    return hours;
  };

  var formatData = function(details) {
    return {
      google_id: details.place_id,
      filter: [$stateParams.filterNum],  // Eat, Drink, Study
      address: formatAddress(details.formatted_address),      // array of 2 strings
      hours: formatHours(details.opening_hours.periods),
      coordinates: {
          latitude: details.geometry.location.k,
          longitude: details.geometry.location.D
      },
      rating: details.rating,
      price: details.price_level,
      website: details.website,
      business_name: details.name,
      phone: details.formatted_phone_number
    }
  };
});
