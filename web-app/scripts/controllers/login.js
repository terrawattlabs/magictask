angular.module('zapexApp')
  .controller('LoginCtrl', function ($scope, $routeParams, $location, $http, User, $rootScope, $stamplay, $cookies, LoginService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



var referrer = $cookies.get('zapexreferrer');
console.log(referrer);
$scope.ref;

if (referrer) {
  $scope.ref = referrer;
};

$scope.loginForm = false;


$scope.processing = false;
$scope.message = "";

$scope.showSignup = function() {
  console.log('changed view');
  $scope.loginForm = !$scope.loginForm;
};

$scope.reg_error = "";



$scope.registerUser = function () {
  $scope.processing = true;
  if($scope.reg_password == $scope.reg_pass_check 
    && $scope.reg_email != "" && $scope.reg_email != undefined
    && $scope.reg_fname !="" && $scope.reg_fname != undefined
    && $scope.reglname !="" && $scope.reg_lname != undefined
    ){

    var credentials = {
    email : $scope.reg_email,
    password : $scope.reg_password,
    first_name: $scope.reg_fname,
    last_name: $scope.reg_lname,
    referrer: $scope.ref,
    paid: false
  };

  $stamplay.User.signup(credentials)
    .then(function(res) {
      console.log(res);
        $scope.$apply( function() {
            $location.path('/user');
            });

    }, function(err) {
        console.log(err);
    });
    // end if block to check all values were there
    } else {
      if ($scope.reg_email == "" || $scope.reg_email == undefined) {
        $scope.email_helper = "Email is Required";
        $scope.email_warn = true;
      }
      if ($scope.reg_fname == "" || $scope.reg_fname == undefined) {
        $scope.fname_helper = "First Name is Required";
        $scope.fname_warn = true;
      }
      if ($scope.reg_lname == "" || $scope.reg_lname == undefined) {
        $scope.lname_helper = "Last Name is Required";
        $scope.lname_warn = true;
      } else {
        $scope.reg_error = "passwords did not match!";
      }
      $scope.processing = false;
      
    };

  };

  function checkEmail (){
    
    
  };
  
  var logData = {
    email: $scope.login_email,
    password: $scope.login_password
  };

   $scope.loginUser = function(){
      var login_credentials = {
        email : $scope.login_email,
        password : $scope.login_password
      };

      $scope.processing = true;

      Stamplay.User.login(login_credentials)
        .then(function(res) {
          console.log(res);


          $scope.$apply( function() {
            $location.path('/user');
            LoginService.setStatus(true);
          });


          //   $scope.$apply( function() {
          //   $location.path('/user');
          //   LoginService.setStatus(true);
          //   });
          // } else {

          //   $scope.$apply( function() {
          //   $location.path('/subscribe');
            
          //   });
          // }

           
        }, function(err) {
          console.log(err);
        })
    
  };



  });
