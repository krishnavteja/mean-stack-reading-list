readingItemsApp = angular.module('readingItemsApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/readingItems.html',
        controller: 'ReadingItemsCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });