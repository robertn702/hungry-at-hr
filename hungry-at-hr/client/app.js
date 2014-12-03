var app = angular.module('hungry', [
  'ngRoute',
  'hungry.list',
  'hungry.business',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('business', {
      url: '/business',
      templateUrl: 'views/business.html'
    })
    // .state('map', {
    //   url: '/map',
    //   templateUrl: 'views/map.html'
    // })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html'
    })
    .state('add-business', {
      url: '/add-business',
      templateUrl: 'views/add-business.html'
    })
    .state('details', {
      url: '/details',
      templateUrl: 'views/business.html'
    })
});