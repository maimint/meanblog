var app = angular.module('myApp', ['ngRoute']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../partials/blogList.html',
        controller: IndexCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/detailPost.html',
        controller: ReadPostCtrl
      });
  });