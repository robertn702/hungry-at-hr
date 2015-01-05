angular.module('hungry.write-review', [])

.controller('writeReviewController', function($scope, $state, $http, $stateParams) {
  // Scope variables
  $scope.rating = 0;
  $scope.price = 0;

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

  // disables submit button if a price or rating has not been selected
  $scope.hasPriceAndRating = function(price, rating) {
    if (rating > 0 && price > 0)
      return '';
    else
      return 'disabled';
  };

  // submits the user's review
  $scope.submitReview = function() {
    $http.post('/review', {
      google_id: $stateParams.google_id,
      review: $scope.textareaInput,
      rating: $scope.rating,
      price: $scope.price,
      date: Date.now()
    }).
    success(function(data, status, headers, config) {
      console.log('posted review');
      $state.go('home.business.reviews');
    }).
    error(function(data, status, headers, config) {
      console.error('error posting review');
    });
  };
});
