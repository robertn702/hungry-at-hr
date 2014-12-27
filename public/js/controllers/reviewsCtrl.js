angular.module('hungry.reviews', [])

.controller('ReviewsController', function($scope, $state, $http, $stateParams) {
  var init = function() {
    getReviews();
  };

  var getReviews = function() {
    $http.get('/review').
    success(function(data, status, headers, config) {
      $scope.reviews = data;
    }).
    error(function(data, status, headers, config) {
      console.error('error getting data');
    });
  };

  init();
});