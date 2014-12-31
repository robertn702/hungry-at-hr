angular.module('hungry.reviews', [])

.controller('ReviewsController', function($scope, $state, $http, $stateParams) {
  var init = function() {
    getReviews();
  };

  var getReviews = function() {
    $http.get('/review/' + $stateParams.google_id).
    success(function(data, status, headers, config) {
      $scope.reviews = data.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
      });
    }).
    error(function(data, status, headers, config) {
      console.error('error getting data');
    });
  };

  init();

});
