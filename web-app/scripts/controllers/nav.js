angular.module('zapexApp')
  .controller('NavCtrl', function ($scope, $routeParams, $location, $http, $stamplay, $cookies, LoginService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loggedIn = false;

    $scope.$watch(function () { return LoginService.getStatus();
      }, function (v) {
        $scope.loggedIn = v;
    });

console.log('nav');

    Stamplay.User.currentUser()
    .then(function(res) {
      console.log(res);
     if (res.user == undefined) {
            //$location.path('/login');
            //$scope.$apply();
            console.log('user undefined');
     } else {
      if (res.user.paid == false) {
          //$location.path('/subscribe');

        
            // $location.path('user');
          $scope.loggedIn = true;
          console.log('in user paid == false');
          $scope.$apply();
        } else {
      //$location.path('/user');

      console.log('user should be set to true');
      $scope.loggedIn = true;
      $scope.$apply();
     };
   };
    }, function(err) {
      console.log(err);
      // error
    });



    $scope.logout = function () {
       $stamplay.User.logout();
       $location.path('/login')
    };


    $scope.isActive = function (viewLocation) {
          if (viewLocation == $location.path()) {
            return true
          } else {
            return false
          };
          // return viewLocation === $location.path();
      };



     $scope.goToPage = function(path){
        $location.path(path);
    
  };
   



  });
