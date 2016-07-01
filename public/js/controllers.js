function IndexCtrl($scope, $http) 
{
  $http.post('/back/managePost').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function ReadPostCtrl($scope, $http, $routeParams)
{
	$http.get('/back/readPost/' + $routeParams.id).
    success(function(data) {
    	$scope.post = data.post;
    });
}






