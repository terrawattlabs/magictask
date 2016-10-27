angular.module('zapexApp')
  .controller('SuccessCtrl', function ($scope, $routeParams, $location, $http, appService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.user;

 Stamplay.User.currentUser()
        .then(function(res) {
         console.log(res);
         console.log(res.user);
         createConnection(res.user);   
         
        }, function(err) {
            console.log(err);
              });



$scope.appName = $routeParams.appName;

$scope.successParams = $location.search();


console.log($scope.successParams);



function createConnection(u){

  // save authorization data to database
  var data = {
    name : $scope.appName,
    user: u,
    credential_object: {
      user_id : $scope.successParams.id,
      user_email : $scope.successParams.email,
      user_name : $scope.successParams.name,
      refreshToken : $scope.successParams.refresh,
      tempToken : $scope.successParams.token
    },
    pull_settings : {}
  };


  Stamplay.Object("connections").save(data)
    .then(function(res) {
     // success

    console.log(res);


      $scope.$apply( function() {
              $location.path('/edit/' + res.id);
            });

    }, function(err) {
      // error
    });

};








  });


