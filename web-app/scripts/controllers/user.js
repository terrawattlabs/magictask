angular.module('zapexApp')
  .controller('UserCtrl', function ($scope, $routeParams, $location, $http, $stamplay, User) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.user;




$scope.connections;

function createArray (d) {
  for (var i = 0; i = d.length - 1; i++) {
    console.log(d[i]);
  }
};



 Stamplay.User.currentUser()
        .then(function(res) {
         $scope.user = res.user;
         console.log(res);
         addUser(res.user.id);
         $scope.$apply();
        }, function(err) {
            console.log(err);
              });

$scope.tasks;


$scope.pullUserConnections = function (){

  console.log('pulled user connections');
  Stamplay.Object("connections").findByCurrentUser()
    .then(function(res) {
      console.log(res.data.length);
      if (!res.length) {
        $scope.noTasks = "You don't have any tasks. Select an app on the left ";
      };
      $scope.connections = res.data;
      $scope.$apply();
      // Success
    }, function(err) {
      console.log(err);
      // Error
    });

};

$scope.pullUserConnections();


  Stamplay.Object("apps").get({})
    .then(function(res) {

      $scope.apps = res.data;
      //createArray(res.data);

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




  // Stamplay.Object("task_templates").get(query)
  //   .then(function(res) {
  //     $scope.appTasks = res.data;
  //     console.log($scope.appTasks);
  //     $scope.$apply();
  //   }, function(err) {
  //     // error
  //   });

};

$scope.copyTemplate = function (x){

    var selTask = $scope.appTasks[x];

    var data = {
    name : selTask.name,
    owner : $scope.user.id,
    sample_data : selTask.sample_data,
    selector_data : selTask.selector_data,
    description : selTask.description,
    setupStep: 0,
    url: selTask.url
  }

  Stamplay.Object("zapex_task").save(data)
    .then(function(res) {
     console.log(res);
     var newID = res.id;
     changeLoc('/setup/' + newID);

    }, function(err) {
      // error
    });

};

function changeLoc (l) {
  console.log('got to change loc function');
  $scope.$apply( function() {
              $location.path(l);
            });
  
};

$scope.changePage = function(l){
  $location.path(l);
};

$scope.goToEdit = function(x){
  var connectionID = $scope.connections[x].id;
  $location.path('/edit/' + connectionID);
};


$scope.help = false;
$scope.showHelp = function () {
  $scope.help = !$scope.help;
};


$scope.taskData = {
    "app" : "gmail",
  };

function addUser (id){
  $scope.taskData.owner = id;
};

  $scope.taskData.extra_fields = [];

   function formPage () {
    console.log('ran form page function'); 
    $location.path('/form');
    $scope.$apply();
  };


  $scope.saveTask = function (){
    console.log($scope.taskData);

    var data = angular.toJson($scope.taskData);
    var d = JSON.parse(data);

  // Stamplay.Object("zapex_task").save($scope.taskData)
  //   .then(function(res) {
  //     // success
  //   }, function(err) {
  //     // error
  //   });

//  $http({
//   method: 'POST',
//   url: "https://zapex.stamplayapp.com/api/cobject/v1/zapex_task",
//   headers: {
//     'Accept': "application/json",
//     'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
//   },
//   body: $scope.taskData
// }).then(function successCallback(response) {
//    console.log('worked');
//   }, function errorCallback(response) {
//     console.log('didnt work');
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });


  // With Promise
  Stamplay.Object('zapex_task')
    .save(d)
      .then(function(res) {
        console.log('it worked it saved');
        formPage();
      }, function(err) {
        console.log(err);
      });






  };

 


    $scope.addCustom = function() {
      //console.log($scope.extra_inputs.length);

      var x = {
        "name": "",
        "type": "text"
      };

      $scope.taskData.extra_fields.push(x);
      console.log($scope.taskData.extra_fields.length);

      }; //end addCustom



$scope.deleteTask = function (x) {
    var id = $scope.tasks[x].id;
  Stamplay.Object("zapex_task").remove(id)
    .then(function(res) {
      $scope.pullUserTasks();
    }, function(err) {
      // error
    })

};


$scope.smokeTestService = function (s){
  var loc = "/smoke?name=" + s;

  console.log(loc);
  $scope.changePage(loc);
};






  }); // end controller



