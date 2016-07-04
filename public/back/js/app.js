var app = angular.module('myApp', ['ngRoute', 'ngStorage']).
  config(function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../back/partials/Login.html',
        controller: AuthCtrl
      }).
      when('/dashboard', {
        templateUrl: '../back/partials/dashboard.html',
        controller: AuthCtrl
      }).
      when('/addpost', {
        templateUrl: '../back/partials/addPost.html',
        controller: addPostCtrl
      }).
      when('/manageposts', {
        templateUrl: '../back/partials/managePost.html',
        controller: ManageBlogsCtrl
      });


      //Before router middleware
      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope', function($q, $location, $localStorage, $rootScope) {

        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    $rootScope.islogged = 1;
                    if($location.path() == '/')
                      $location.path('/dashboard');
                }
                else
                {
                  $rootScope.isloggged = 0;
                  $location.path('/');
                }


                return config;
            },
            'responseError': function(response) {
            	alert(response);
                if(response.status === 401 || response.status === 403) {
                    $location.path('/');
                }
                return $q.reject(response);
            }
        };
    }]);
     
       //$locationProvider.html5Mode(true);

});


