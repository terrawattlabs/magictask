angular.module('zapexApp')
  .controller('FormCtrl', function ($scope, $routeParams, $location, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.taskSelected = false;

    Stamplay.User.currentUser()
    .then(function(res) {
      // success
    }, function(err) {
      // error
    })

    $scope.selectedTask = {name: "Select a Task"};

    $scope.email = $location.search().email;
    $scope.fromName = $location.search().fromName;
    $scope.emailBody = $location.search().emailBody;
    $scope.subject = $location.search().subject;


$scope.selectedTask;

$scope.selectTask = function(i){
	$scope.selectedTask = $scope.tasks[i];

	$scope.sendURL = $scope.tasks[i].zapier_url;
	$scope.inputs = $scope.tasks[i].extra_fields;
	$scope.taskSelected = true;

	console.log($scope.selectedTask.zapier_url);
};



Stamplay.Object("zapex_task").findByCurrentUser()
    .then(function(res) {
      $scope.tasks = res.data;
    $scope.$apply();
    }, function(err) {
      // Error
    });


$scope.sendData = function(){
 $http({
  method: 'POST',
  url: $scope.selectedTask.zapier_url,
  headers: {
  	'Accept': "application/json",
  	'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  data: {
  	"email": $scope.email,
  	"fromName": $scope.fromName,
  	"emailBody": $scope.emailBody,
  	"subject": $scope.subject,
  	"custom_inputs": $scope.inputs
  }
}).then(function successCallback(response) {
   console.log('worked');
   successPage();
  }, function errorCallback(response) {
  	console.log('didnt work');
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

};

function successPage () {
	$location.path('/success');

};


  });
