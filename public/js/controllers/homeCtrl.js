angular.module('hungry.home', [])

.controller('HomeController', function($scope, $state, $http) {
  $scope.searchItems = ['hungry', 'thirsty', 'studious'];
  console.log('searchItem: ', $scope.searchItem);
    angular.element(document.querySelector('header.home')).addClass('home-header');
    angular.element(document.querySelector('.background-gradient')).addClass('background-gradient-home').removeClass('background-gradient');

  $scope.init = function() {
    getData();
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

  $scope.init();

  $scope.startSearch = function(keyEvent, filterName) {
    if (keyEvent.which === 13) {
      $state.go('home.search', { filterNum: $scope.searchItems.indexOf(filterName) });
      angular.element(document.querySelector('header.home')).removeClass('home-header');
      angular.element(document.querySelector('.background-gradient-home')).addClass('background-gradient').removeClass('background-gradient-home');
    }
  };
});
