//All Controllers in backoffice
function AuthCtrl($scope, $http, $location, $localStorage)
{
  $scope.name 		  = 'Login Auth';
  $scope.error    	= $localStorage.token;

  $scope.authForm	=	function()
  {
		  var username 	=	$scope.username;
  		var	password	=	$scope.password;

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
		                pass : 	password,
		        }
			})
	      .success(function(data)
	      {
	        if(data.error === 0)
	        {
    				$localStorage.token = data.token;
    				$scope.error        = $localStorage.token;

            $location.path('/dashboard');
	          	
	        }
	        else
	        {
	          $scope.error     =   data.text;
	          $scope.class     =   'alert alert-danger';
	        }
	      });

		}
  		catch(e)
  		{
  			$scope.error	= 	e.msg;
  			$scope.class 	=   'alert alert-danger';
  			return;
  		}	

  		
  };
}

function addPostCtrl($scope, $http, $location)
{
	   $scope.class  = '';
     
  	// Submit Post Form
    $scope.addPost = function()
    {

      var title   = $scope.title;
      var desc    = $scope.desc;

      try{
            
          if(title == "" || title == null)
            throw ({msg:'Please Enter Your Blog Title'});

          else if(desc == "" || desc == null)
            throw ({msg:'Please Enter Your Blog Description'});

          $http({
              method  : 'post',
              url     : '/back/addPost',
              data    : {

                      title :  title,
                      desc  :  desc,
              }
        })
          .success(function(data)
          {
            if(data.error === 0)
            {
              
              $location.path('/manageposts');
                
            }
            else
            {
              $scope.error    =   data.msg;
              $scope.class    =   'alert alert-danger';
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
}

function ManageBlogsCtrl($scope, $http, $location)
{
    
  // Get All Posts
    $http({
            method  : 'post',
            url     : '/back/managePost',
            
      })
      .success(function(data)
      {

        console.log(data.posts);
        if(data.error == 0)
        {
          console.log(data.posts);
          $scope.postList  = data.posts;
        }
        else
        {
          $scope.error    =   data.msg;
          $scope.class    =   'alert alert-danger';
        }
      });

      
    //Delete Post
    $scope.deletePost  = function(id)
    {
      
      var result = confirm("Are you want to delete?");

      if( ! result)
        return;

        $http({
            method  : 'post',
            url     : '/back/deletePost',
            data    : {

                    post :  id,
            }
        })
        .success(function(data)
        {
          if(data.error == 0)
          {
            $location.path('/manageposts');
          }
          else
          {
            $scope.msg    =   data.msg;
            $scope.class  =   'alert alert-danger';
          }
        });
    };
}

//Main Ctrl
function MainCtrl($location, $localStorage)
{
  $scope.logout   = function()
  {
    delete $localStorage.token;
    $location.path('/');
  };
}

    

 


    



