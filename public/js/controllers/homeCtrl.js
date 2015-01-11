angular.module('hungry.home', [])

.controller('HomeController', function($scope, $state, $http, $stateParams) {
  $scope.searchItems = ['hungry', 'thirsty', 'studious'];
  $scope.showHeaderIcons = true;
  $scope.business_list;

  var init = function($scope) {
    // sets up css for home screen
    if ($state.is('home')) {
      angular.element(document.querySelector('header.home')).addClass('home-header');
      angular.element(document.querySelector('.background-gradient')).addClass('background-gradient-home').removeClass('background-gradient');
      $scope.showHeaderIcons = false;
    };

    //checks if user is logged in
    loggedIn();

    // persists the filter value
    $scope.searchItem = setFilterValue($scope.searchItems, $stateParams);

    // gets business data
    getData();

    // initally don't show modal
    $scope.show_modal = false;
  };


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

  var setBusinessList = function(filterNum) {
    switch (filterNum) {
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

  var loggedIn = function() {
    $http.get('/logged-in').
      success(function(data, status, headers, config) {
        $scope.isLoggedIn = data.result;
      }).
      error(function(data, status, headers, config) {
        console.error('error getting authentication data');
      });
  };

  // persits the filter value
  var setFilterValue = function(filtersArray, params) {
    if (params.filterNum)
      return filtersArray[params.filterNum];
    else
      return filtersArray[0];
  };

  init($scope);

////// MODAL
  $scope.showModal = function() {
    $scope.show_modal = true;
  };

  $scope.closeModal = function(){
    $scope.show_modal = false;
  };
////// END MODAL

  $scope.startSearch = function(keyEvent, filterName) {
    $scope.showHeaderIcons = true;
    if (keyEvent.which === 13) {
      $state.go('home.search', { filterNum: $scope.searchItems.indexOf(filterName) });
      angular.element(document.querySelector('header.home')).removeClass('home-header');
      angular.element(document.querySelector('.background-gradient-home')).addClass('background-gradient').removeClass('background-gradient-home');
    }
  };

  // allows user to ng-repeat set number of times
  $scope.repeatXTimes = function(x) {
    return new Array(x);
  };

});
