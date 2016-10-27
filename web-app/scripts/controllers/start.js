angular.module('zapexApp')
  .controller('startCtrl', function ($scope, $routeParams, $location, $http, $stamplay) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

console.log('why');



  Stamplay.Object("apps").get({})
    .then(function(res) {

      $scope.apps = res.data;

      $scope.$apply();
      // Success
    }, function(err) {
      // Error
    });





$scope.pullTemplates = function (x) {
  var Appid = $scope.apps[x].id;
  var query = {
    app : Appid
  };

    $stamplay.Object("task_templates").get(query)
    .then(function(res) {
      $scope.appTasks = res.data;
      console.log($scope.appTasks);
      $scope.$apply();
    }, function(err) {
      // error
    });


    };

  });
