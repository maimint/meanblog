function IndexCtrl($scope, $http) 
{
  $http.post('/back/managePost').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}






