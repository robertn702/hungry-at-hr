var app = angular.module('hungry', [
  'hungry.home',
  'hungry.business',
  'hungry.add-business',
  'hungry.search',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngAutocomplete'
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
      url: '/search/:filterNum',
      templateUrl: 'views/home.search.html',
      controller: 'SearchController',
      authenticate: false
    })
    .state('home.business', {
      url: '/business/:filterNum/:google_id',
      templateUrl: 'views/home.business.html',
      controller: 'BusinessController',
      authenticate: false
    })
    .state('home.add-business', {
      url: '/add-business',
      templateUrl: 'views/home.add-business.html',
      controller: 'AddBusinessController',
      authenticate: false
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      authenticate: false
    })
});
