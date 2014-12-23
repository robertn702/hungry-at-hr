angular.module('hungry.add-business', [])

.controller('AddBusinessController', function($scope) {
  $scope.init = function() {
    $scope.map = {
      center: { latitude: 37.783748, longitude: -122.409046 },
      zoom: 14
    };
  };
  $scope.init();
  $scope.data = {};
  $scope.address = [];
  $scope.inputOptions = {
    types: 'restaurant|cafe|bar',
    country: 'us',
    watchEnter: true
  };

  $scope.getData = function() {
    console.log($scope.details);
    $scope.map = {
      center: {
        latitude: $scope.details.geometry.location.k,
        longitude: $scope.details.geometry.location.D
      }
    };

    $scope.address = formatAddress($scope.details.address_components);
    $scope.hours = formatHours($scope.details.opening_hours.periods);
    $scope.data = formatData($scope.details);
    console.log($scope.address);
    console.log($scope.hours);
    // console.log($scope.data);
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
      if (lunchStart >= openTime && lunchEnd <= closeTime) {
        hours.lunch[dayOpen] = true;
      } else {
        hours.lunch[dayOpen] = false;
      }
      // check if open for dinner
      if (dinnerStart >= openTime && dinnerEnd <= closeTime) {
        hours.dinner[dayOpen] = true;
      } else {
        hours.dinner[dayOpen] = false;
      }
    }
    return hours;
  };

  var formatData = function(details) {
    return {
      google_id: details.place_id,
      filter: String,               // Eat, Drink, Study
      address: $scope.address,      // array of 2 strings
      hours: {
          lunch: Array,             // array of 5 booleans (true or false depending on day of week)
          dinner: Array
      },
      coordinates: {
          latitude: details.geometry.location.k,
          longitude: details.geometry.location.D
      },
      rating: details.rating,
      price: details.price,
      website: details.website,
      business_name: details.name,
      phone: details.phone
    }
  }

});
