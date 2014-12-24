angular.module('hungry.home', [])

.controller('HomeController', function($scope, $state, $http, $stateParams) {
  $scope.searchItems = ['hungry', 'thirsty', 'studious'];

  var init = function() {
    // sets up css for home screen
    if ($state.is('home')) {
      angular.element(document.querySelector('header.home')).addClass('home-header');
      angular.element(document.querySelector('.background-gradient')).addClass('background-gradient-home').removeClass('background-gradient');
    };

    // gets business data
    getData();

    // persists the filter value
    $scope.searchItem = setFilterValue($scope.searchItems, $stateParams);
    console.log($scope.searchItem);
  };

  // makes http request to get array of businesses
  var getData = function() {
    $http.get('/business').
      success(function(data, status, headers, config) {
        $scope.data = data;
      }).
      error(function(data, status, headers, config) {
        console.error('error getting data');
      });
  };

  // persits the filter value
  var setFilterValue = function(filtersArray, params) {
    if (params.filterNum)
      return filtersArray[params.filterNum];
    else
      return filtersArray[0];
  };

  init();

  $scope.startSearch = function(keyEvent, filterName) {
    if (keyEvent.which === 13) {
      $state.go('home.search', { filterNum: $scope.searchItems.indexOf(filterName) });
      angular.element(document.querySelector('header.home')).removeClass('home-header');
      angular.element(document.querySelector('.background-gradient-home')).addClass('background-gradient').removeClass('background-gradient-home');
    }
  };
});
