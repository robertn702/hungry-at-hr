var app = angular.module('hungry', [
  'ngRoute',
  'hungry.list',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("home");
  //
  // Now set up the states
  $stateProvider
    .state('business', {
      url: '/business',
      templateUrl: 'views/business.html'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'views/signin.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html'
    })
    .state('add-business', {
      url: '/add-business',
      templateUrl: 'views/add-business.html'
    })
});