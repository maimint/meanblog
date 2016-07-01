var app = angular.module('myApp', ['ngRoute']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../partials/blogList.html',
        controller: IndexCtrl
      })
  });