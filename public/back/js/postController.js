var postApp  = angular.module('postApp', ['ngRoute', 'ngStorage']).
  config(function($routeProvider, $httpProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../back/partials/Login.html',
        controller: postController
      }).
      when('/dashboard', {
        templateUrl: '../back/partials/dashboard.html',
        //controller: AuthCtrl
      });


      $httpProvider.interceptors.push(['$q', '$location', '$localStorage','$rootScope', function($q, $location, $localStorage, $rootScope) {

        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                     $rootScope.isloggged = 1;
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
     


  });

postApp.controller('postController', function($scope, $http, $localStorage, $location)
{
    
  $scope.class            = '';
  $scope.addForm          = false;
  $scope.manageForm       = true;

  $scope.authform = function()
  {
      var username  = $scope.username;
      var password  = $scope.password;

      alert($scope.username);
      try{

        if(username == null)
          throw ({msg:'Please Enter Your Username'});

        else if(password == null)
          throw ({msg:'Please Enter Your Password'});

        $http({
            method  : 'post',
            url     : '/back/auth',
            data    : {

                    user :  username,
                    pass :  password,
            }
      })
        .success(function(data)
        {
          if(data.error === 0)
          {
            $localStorage.token = data.token;
            $scope.error        = $localStorage.token;
          }
          else
          {
            $scope.error    =   data.text;
            $scope.class     =   'alert alert-danger';
          }
        });

    }
      catch(e)
      {
        $scope.error  =   e.msg;
        $scope.class  =   'alert alert-danger';
        return;
      } 

      
  };

$scope.logout   = function()
{
    alert('test');
    delete $localStorage.token;
    $location.path('/');
};
  

    // Submit Video Form
    $scope.submitForm   = function()
    {
      
      $http({
        method  : 'post',
        url     : '/back/savevideo',
        data    : {

                video :  $scope.videoid,
        }

      })
      .success(function(data)
      {
        if(data.error === 0)
        {
          $scope.msg      = data.text;
          $scope.videoid  = '';
          $scope.class    = 'alert alert-success';
        }
        else
        {
          $scope.msg    =   data.text;
          $scope.class  =   'alert alert-danger';
        }
      });

    };


    //Delete videos

      $scope.deleteVideo  = function(id)
      {

        var result = confirm("Are you want to delete?");

        if( ! result)
          return;

          $http({
              method  : 'post',
              url     : '/back/deletevideo',
              data    : {

                      video :  id,
              }
          })
          .success(function(data)
          {
            if(data.error == 0)
            {
              $scope.msg        = data.text;
              $scope.videoList  = data.videos;
              $scope.class      = 'alert alert-success';
            }
            else
            {
              $scope.msg    =   data.text;
              $scope.class  =   'alert alert-danger';
            }
          });
      };


      //Add video

      $scope.addVideo  = function()
      {
          $scope.addForm          = true;
          $scope.manageForm       = false;
      };
});