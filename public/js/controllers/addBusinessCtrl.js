angular.module('hungry.add-business', [])

.controller('AddBusinessController', function($scope, $http, $state, $stateParams, Businesses) {
  angular.extend($scope, Businesses);
  $scope.business_data = {};
  $scope.address = [];
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
    center: { latitude: 37.783748, longitude: -122.409046 },
    zoom: 16
  };

  $scope.backToMaps = function() {
    $state.go('home.search', { filterNum: $stateParams.filterNum });
  };

  // when the user
  $scope.getData = function(details, keyEvent) {
    console.log('keyEvent: ', keyEvent);
    $scope.map = {
      center: {
        latitude: details.geometry.location.k,
        longitude: details.geometry.location.D
      },
      zoom: 16
    };

    $scope.marker = [{
      id: 0,
      latitude: details.geometry.location.k,
      longitude: details.geometry.location.D
    }];

    $scope.address = formatAddress(details.address_components);
    $scope.hours = formatHours(details.opening_hours.periods);
    $scope.business_data = formatData(details);
    isDuplicate(details.place_id);
  };

  // checks if business is a duplicate
  var isDuplicate = function(googleId) {
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

  $scope.submitData = function() {
    $http.post('/business', $scope.business_data).
      success(function(data, status, headers, config) {
        console.log('added business');
        $state.go('home.business', { google_id: data.google_id, filterNum: $stateParams.filterNum });
      }).
      error(function(data, status, headers, config) {
        console.log('error adding business', status);
      });
  };

  var formatAddress = function(addressComps) {
    var address = [];
    if (addressComps.length === 6) {
      address[0] = addressComps[0].long_name + ' ' + addressComps[1].long_name;
      address[1] = addressComps[2].long_name + ', ' + addressComps[3].short_name + ' ' + addressComps[5].long_name;
    } else if (addressComps.length === 7) {
      address[0] = addressComps[1].long_name + ' ' + addressComps[2].long_name + ' ' + addressComps[0].long_name;
      address[1] = addressComps[3].long_name + ', ' + addressComps[4].short_name + ' ' + addressComps[6].long_name;
    }
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
      address: $scope.address,      // array of 2 strings
      hours: $scope.hours,
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
