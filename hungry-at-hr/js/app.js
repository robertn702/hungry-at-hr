var 

var app = angular.module('myApp', ['ui.router']);

// app.controller

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
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
});