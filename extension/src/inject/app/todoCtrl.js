'use strict';

angular.module('app').controller('todoCtrl', function ($scope, taskService, $timeout, userService, serviceService, asanaService) {

$scope.loginPage = true;
$scope.loginForm = true;
$scope.waitingPage = false;


$scope.logoutUser = function(){
    userService.logout().then(function(d){
                
          console.log(d);
          $scope.loginPage = true;
          $scope.loginForm = true;
          $scope.waitingPage = false;
        });
};

Stamplay.User.currentUser()
    .then(function(res) {
     
      //console.log(res);
      if (res.user) {
         $scope.waitingPage = true;
         $scope.loginForm = false;
         console.log(res);
         console.log("pulled user");
        pullUserInfo(res.user);
      } else {
         console.log('i dont think i found a user');
      }
      
     
      //console.log(res);
    }, function(err) {
      console.log(err);
    });

var userPullSettings = {
  'asana': '',
  'trello': ''
};

var asanaRefresh;


$scope.login = function (){
  $scope.loginForm = false;
  $scope.waitingPage = true;
   userService.login($scope.useremail, $scope.userpass).then(function(d){
                
                pullUserInfo(d);
                });
};

function pullUserInfo(u) {
  console.log('pull user information');
   userService.pullMTConnections(u.id).then(function(d){
              console.log(d);
              console.log(d.data.length);
              if (d.data.length == 0) {
                $scope.waitingPage = false;
                $scope.loginPage = false;
              };
              console.log('inside the pull connections function');
              for (var i = d.data.length - 1; i >= 0; i--) {
                if (d.data[i].name == 'asana') {
                  userPullSettings.asana = d.data[i].pull_settings;
                  asanaRefresh = d.data[i].credential_object.refreshToken;
                   updateToken(asanaRefresh, userPullSettings.asana);
                   console.log('found connections');
                }
              }
              
              
                });
};

function updateToken(r,s){
  console.log('update token functino');
  taskService.refreshToken(r).then(function(d){
    userService.setToken('asana', d.data.access_token);
    console.log('seemed to have set the token');
    createProjectArray(s);
  });

};

function createProjectArray (connection) {
console.log('creating project array');
  var array = $.map(connection, function(value, index) {
    return [value];
});

  console.log(array);

  var results = [];

  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i].pull == true) {
      

      var projArray = $.map(array[i].projects, function(value, index) {
                        return [value];
                    });


      for (var x = projArray.length - 1; x >= 0; x--) {
        var projObj = {};
        if (projArray[x].pull == true) {
      
          projObj["workspace"] = array[i].id;
          projObj["project"] = projArray[x].id;
          results.push(projObj);
        }
        
      }
    }
  }

  taskService.pullProjectInfo(results).then(function(d){
    for (var i = d.length - 1; i >= 0; i--) {
      $scope.projList.push(d[i].data.data);
    }
    
    pullTasks(results);
  });
};


  function pullTasks(r) {
      taskService.pullTasksByProject(r).then(function(d){
            
                console.log(d);
                var arr = [];

                for (var i = d.length - 1; i >= 0; i--) {
                  for (var x = d[i].data.data.length - 1; x >= 0; x--) {
                    arr.push(d[i].data.data[x]);
                  }
                  if (i == 0) {
                   compileAsanaTaskList(arr);

                  }

                };

              
                });
  };


    $scope.showMagicTask = false;
    $scope.taskLimit = 5;

    // show task list or task detail. 
    // List == true
    // detail == false

    $scope.showTasks = true;

    $scope.selectedTask;

    $scope.toggleMagicTask = function (){
      $scope.showMagicTask = !$scope.showMagicTask;
    };

    $scope.dueTasks = 0;


    $scope.projList = [];
    $scope.selectedProject = {"name": "Select a Project"};

    $scope.taskList = [];


    function initData (){
        
        

        taskService.getProjects().then(function(d){
        
        $scope.projList = [];
        $scope.projList = d.data;
        

   
        });

    };

   

    function createBadge() {
      $scope.dueTasks = 0;
      var now = moment().hour(23).minute(59);

      for (var i = $scope.taskList.length - 1; i >= 0; i--) {
          
        if ($scope.taskList[i].dueObj.due < now) {
          $scope.dueTasks = $scope.dueTasks +1;
        }    

      } 

    };


    function search(id, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === id) {
            return myArray[i];
        }
    }
};

 function searchForIndex(id, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === id) {
            return i;
        }
    }
};

    function compileAsanaTaskList(arr) {
          
            $scope.taskList = [];
            for (var i =0 ; i <= arr.length -1; i++) {
              
            

                            if (arr[i].due_on == null) {

                            } else{

                            var obj = {};
                            var dueObj = {};

                            dueObj.due = moment(arr[i].due_on).hour(23).minute(59);
                            dueObj.mom = dueObj.due.fromNow();
                            dueObj.cal = dueObj.due.calendar(null, {
                                  sameDay: '[Today]',
                                  nextDay: '[Tomorrow]',
                                  nextWeek: 'dddd',
                                  lastDay: '[Yesterday]',
                                  lastWeek: '[Last] dddd',
                                  sameElse: 'MMM Do'
                              });
                            var dueMonth = dueObj.due.get('month') + 1;
                            var dueDate = dueObj.due.get('date');
                            dueObj.date = dueMonth + "/" + dueDate;
                            dueObj.givenDueDate = arr[i].due_on;


                    
                           var img_url = serviceService.getServiceValues('asana').img_url;
                           var project = search(arr[i].projects[0].id, $scope.projList);
                           var color = project.color;
                           var projName = project.name;

                           //console.log(color);

                            obj.name = arr[i].name;

                            obj.service = 'asana';
                            obj.dueObj = dueObj;
                            obj.id = arr[i].id;
                            obj.color = color;
                            obj.projObj = project;
                            obj.completed = false;
                            obj.notes = arr[i].notes;
                            obj.img_url = img_url;

                            $scope.taskList.push(obj);

                        }// end else block
                      }
                
                sortTaskList();
                createBadge();
         
                $scope.loginPage = false;
          

               // $timeout(pullTasks, 300000);



    };



//sort the task list by due date... called from other functions that add items to task list
function sortTaskList (){
  $scope.taskList.sort(function (a, b) {
    if (a.dueObj.due > b.dueObj.due) {
      return 1;
    }
    if (a.due < b.due) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
};



    // button toggling 

      $scope.status = {
        isopen: false
      };

      $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
      };

      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
      };

      $scope.selectProject = function (x){
        console.log('selected a project, thanks!');
        $scope.selectedProject = $scope.projList[x];
      };
  
      $scope.markCompleted = function (x) {

            var id = $scope.taskList[x].id; 

            $scope.taskList[x].completed = true;

            var update = {
          "completed": true
          };

            taskService.updateTask(id,update).then(function(d){
                updateToken(asanaRefresh, userPullSettings.asana);

                });
      };

    $scope.taskClass =function(task){
        var cl;
        if (task.completed == true) {
            cl = "completedTask";
        };
        return cl;
    };

    $scope.dueDateClass = function (task) {
      var cl;
      var now = moment();
      if (task.dueObj.due < now) {
        cl = "past-due"
      };
      return cl;

    };


    $scope.processedText;
    $scope.newTask = [];
    $scope.newTask.dateGuess = [];

    $scope.parseInput = function (){
        var text = chrono.parse($scope.taskInput);
         $scope.newTask.dateGuess = [];

        if (text.length == 0) {

        } else {
          
           var task =  $scope.taskInput.slice(0,text[0].index);
           if (task.endsWith(" on ") || task.endsWith(" by ")) {
            task = task.slice(0,text[0].index - 4);
           };

           var date = text[0].start.date();
           var mom = moment(date);
           var formatted = mom.format("dddd, MMMM Do YYYY");
           var yr = mom.get('year');
           var month = mom.get('month') + 1;

           if (month <10) {
            month = "0" + month;
           }



           var date = mom.get('date');
           if (date <10) {
            date = "0" + date;
           }


           var d = yr + '-' + month + '-' + date;

           $scope.newTask.name = task;
           $scope.newTask.dateGuess.readable = formatted;
           $scope.newTask.dateGuess.send = mom;
           $scope.newTask.dateGuess.date = d;

           

           // var year = text[0].start.impliedValues.year;
           // var due_date = moment().year(year).month(month).date(date);
           // console.log(due_date);

         };
       
    };

    $scope.addTaskDiv = false;


$scope.toggleAdd = function(){
  $scope.addTaskDiv = !$scope.addTaskDiv;
  console.log('clicked it');
};


$scope.sendTask = function (){

  var projects = [];
  projects.push($scope.selectedProject.id);

  console.log(projects);
  var name = $scope.newTask.name;
  var due = $scope.newTask.dateGuess.date;

  taskService.createTask(projects,name,due).then(function(d){
          console.log(d);
          updateToken(asanaRefresh, userPullSettings.asana);
          $scope.toggleAdd();
          $scope.taskInput="";
          $scope.newTask = [];
          $scope.newTask.dateGuess = [];
          });


};


$scope.notReady = function (){
  var disable = true;
  if ($scope.newTask.dateGuess.date && $scope.selectedProject.id && $scope.taskInput) {

    disable = false;
  };

  return disable;
};



$scope.toggleDetail = function (i) {
  $scope.showTasks = !$scope.showTasks;
  if ($scope.showTasks == true) {
    $scope.selectedTask = "";
  } else {
     $scope.selectedTask = $scope.taskList[i];
  };

  console.log($scope.selectedTask);

};

$scope.completeTask = function (t) {

  var taskIndex = searchForIndex(t.id,$scope.taskList);

  console.log(taskIndex);

   var update = {
          "completed": true
          };
    
    taskService.updateTask(t.id,update).then(function(d){
                updateToken(asanaRefresh, userPullSettings.asana);
                $scope.toggleDetail();
                $scope.taskList[taskIndex].completed = true;

                });
};

$scope.saveTask = function(){

    var update = {};

    var id = $scope.selectedTask.id;
    update.notes = $scope.selectedTask.notes;
    update.name = $scope.selectedTask.name;

    taskService.updateTask(id,update).then(function(d){
                updateToken(asanaRefresh, userPullSettings.asana);
                $scope.toggleDetail();
              });

};

$scope.changeLimit = function (d) {
  if (d == 'more') {
    $scope.taskLimit = $scope.taskLimit + 5;
  } if (d == 'less') {
    $scope.taskLimit = Math.max($scope.taskLimit - 5, 1);
  };
};









});




