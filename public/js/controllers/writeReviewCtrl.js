angular.module('hungry.write-review', [])

.controller('writeReviewController', function($scope, $state, $http, $stateParams) {
  // Scope variables
  $scope.rating = 0;
  $scope.price = 0;

  // allows user to use ng-repeat set number of times
  $scope.repeatXTimes = function(x) {
    return new Array(x);
  };

  $scope.updateRating = function(rating) {
    $scope.rating = rating;
  };

  $scope.updatePrice = function(price) {
    $scope.price = price;
  };

  // sets class for stars if selected
  $scope.emptyOrNot = function(index) {
    if (index + 1 > $scope.rating)
      return 'empty';
    else
      return 'yellow';
  };

  // sets class of $ signs if selected
  $scope.selectedOrNot = function(index) {
    if (index + 1 > $scope.price)
      return '';
    else
      return 'green';
  };

  $scope.submitReview = function() {

  };
});
