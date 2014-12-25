var app = angular.module('hungry', [
  'hungry.home',
  'hungry.business',
  'hungry.add-business',
  'hungry.search',
  'hungry.write-review',
  'ui.router',
  'angularify.semantic',
  'uiGmapgoogle-maps',
  'ngAutocomplete'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home');

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
        .state('home.business.reviews', {
          url: '/reviews',
          templateUrl: 'views/home.business.reviews.html',
          // controller: 'ReviewsController',
          authenticate: false
        })
        .state('home.business.write-review', {
          url: '/write-review',
          templateUrl: 'views/home.business.write-review.html',
          controller: 'writeReviewController',
          authenticate: false
        })
      .state('home.add-business', {
        url: '/add-business',
        templateUrl: 'views/home.add-business.html',
        controller: 'AddBusinessController',
        authenticate: false
      })
    .state('home.login', {
      url: '/login',
      templateUrl: 'views/home.login.html',
      authenticate: false
    })
});
