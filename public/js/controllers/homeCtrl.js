angular.module('hungry.home', [])

.controller('HomeController', function($scope, $state, $http, $stateParams) {
  $scope.searchItems = ['hungry', 'thirsty', 'studious'];

  var init = function() {
    if ($state.is('home')) {
      angular.element(document.querySelector('header.home')).addClass('home-header');
      angular.element(document.querySelector('.background-gradient')).addClass('background-gradient-home').removeClass('background-gradient');
    };
    getData();
    setFilterValue();
  };

  var getData = function() {
    $http.get('/business').
      success(function(data, status, headers, config) {
        $scope.data = data;
      }).
      error(function(data, status, headers, config) {
        console.error('error getting data');
      });
  };

  var setFilterValue = function() {
    if ($stateParams.filterNum) {
      $scope.searchItem = $scope.searchItems[$stateParams.filterNum];
    } else {
      $scope.searchItem = $scope.searchItems[0];
    }
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
