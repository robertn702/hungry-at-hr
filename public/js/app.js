var app = angular.module('hungry', [
  'hungry.list',
  'hungry.business',
  'ui.router',
  'angularify.semantic',
  'uiGmapgoogle-maps'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home');
  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      authenticate: false
    })
    .state('home.search', {
      url: '/search',
      templateUrl: 'views/home.search.html',
      authenticate: false
    })
    .state('home.business', {
      url: '/business',
      templateUrl: 'views/home.business.html',
      authenticate: false
    })
    .state('home.add-business', {
      url: '/add-business',
      templateUrl: 'views/home.add-business.html',
      authenticate: false
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      authenticate: false
    })
});
