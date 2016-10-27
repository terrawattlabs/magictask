
angular.module('zapexApp')
  .controller('editCtrl', function ($scope, $routeParams, $location, $http, $stamplay, appService, stamplayService, $q, User, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.user;
$scope.projectSettings = [];

var connectionID = $routeParams.connID;
$scope.connection;

$scope.workspaces;

 Stamplay.User.currentUser()
        .then(function(res) {
         console.log(res);
         console.log(res.user);
         if (!res.user) {
         	console.log(res.user);
         	console.log('got to no res.user part');
         	//$window.location.reload();
         };

         $scope.user = res.user;
        
         
        }, function(err) {
            console.log(err);
              });




var token;
var refresh_token;

stamplayService.getObjectbyID("connections", connectionID).then(function(d){
        	token = d.data[0].credential_object.tempToken;
        	refresh_token = d.data[0].credential_object.refreshToken;
        	if (d.data[0].user == undefined) {
        		console.log('got to the undefined part');
        		addUserToObject(d.data[0].id);
        	};
          appService.getWorkspaces(token,refresh_token).then(function(a){
          	$scope.workspaces = a.data;
          	for (var i= 0; i <= $scope.workspaces.length - 1; i++) {
          		console.log(i);
          		$scope.workspaces[i].projects;
          		$scope.workspaces[i].pull = true;
          		compileProjects(i,$scope.workspaces[i].id);
          	}; // end foor loop
          })
        });

function addUserToObject(x){

	console.log('got to add user to object function');

		var cl = 'connections';
		var id = x;
		var u = $scope.user;
		var data = {
			user: u
		};

		stamplayService.updateObject(cl,id,data).then(function(d){
			console.log(d);

		})
};


function compileProjects (x, w) {

	appService.getProjects(token,w, refresh_token).then(function(d){
		$scope.workspaces[x].projects = d.data;
		for (var i = $scope.workspaces[x].projects.length - 1; i >= 0; i--) {
			$scope.workspaces[x].projects[i].pull = true;
			console.log("Workspace number is " + x);
			console.log("Project number is " + i); 
			if (x == $scope.workspaces.length - 1 &&
				i == $scope.workspaces[x].projects.length - 1) 
				{
					$scope.done = true;
				}
		}
	});
	
};


$scope.uncheckWorkspace = function(x){
	var changeTarget;
	if ($scope.workspaces[x].pull == true) {
		changeTarget = true;
	} else {
		changeTarget = false
	};
	for (var i = $scope.workspaces[x].projects.length - 1; i >= 0; i--) {

		$scope.workspaces[x].projects[i].pull = changeTarget;
	};
};

$scope.uncheckProject = function (p,x) {
	if ($scope.workspaces[p].projects[x].pull == true) {
		$scope.workspaces[p].pull = true;
	} else {

		checkIfTrue(p).then(function(yn){
			//console.log('trying to make workspace true or false');
			if (yn == true) {
				//console.log('at least one is true');
			} else {
				//console.log('none were true');
				$scope.workspaces[p].pull = false;
			}
		});
	};
};


function checkIfTrue (w) {
	var deferred = $q.defer();

	var anyTrue = false;
		for (var i = $scope.workspaces[w].projects.length - 1; i >= 0; i--) {
			if ($scope.workspaces[w].projects[i].pull == true) {
				anyTrue = true;
			} if (i == 0) {
				//console.log('returned check if true promise');
				deferred.resolve(anyTrue);
			};
		};
		return deferred.promise;
	};


	$scope.savePreferences = function (){

		console.log('got to part where you save preferences');

		var cl = 'connections';
		var id = connectionID;
		var pull_settings = processSettings($scope.workspaces);
		var data = {
			pull_settings
		};

		stamplayService.updateObject(cl,id,data).then(function(d){
			console.log(d);
		})

	};


	function processSettings(arr) {

  	var rv = {};

  for (var i = 0; i < arr.length; ++i) {
  	
  	 var ws = {};
  	 var n = "workspace_" + i;
  	 ws["name"] = arr[i].name;
  	 ws["id"] = arr[i].id;
  	 ws["pull"] = arr[i].pull;
  	 var projObj = {};
  	 for (var x = 0; x < arr[i].projects.length; ++x) {
  	 	var m = "project_" + x;
  	 	var proj = {};

  	

  		
  	 	proj["name"] = arr[i].projects[x].name;
  	 	proj["id"] = arr[i].projects[x].id;
  	 	proj["pull"] = arr[i].projects[x].pull;
  	 	projObj[m] = proj;
  	 }
  	 ws["projects"] = projObj;
  	 rv[n] = ws;
  }
   
  return rv;
};






  }); // end of controller




