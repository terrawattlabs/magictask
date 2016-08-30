angular.module('app').service('taskService', function ($q, $http) {

// SET YOUR WORKSPACE AND AUTHORIZATION VARIABLES HERE!!!

var workspace = 64385798792062; // Only one workspace available right now, can update this in the future.



var personal_token = '0/d1b679d62915f096030442a49841eddf'; 
var bearer_token = 'Bearer ' + personal_token;



// END SETTING CUSTOM VARIABLES



var _this = this;


this.getProjects = function (){
	var deferred = $q.defer();

	var fullUrl = 'https://app.asana.com/api/1.0/workspaces/' + workspace + '/projects?opt_fields=color,name&limit=10';

	$http({
	  method: 'GET',
	  url: fullUrl,
	  headers: {
		    'Authorization': bearer_token
		  } 
	}).success(function(data){
		
		deferred.resolve(data);
	}).error(function(msg, code){
		deferred.reject(msg);
		console.log(msg);
	});

	return deferred.promise;

};



this.getTasks = function (){
	var deferred = $q.defer();

	var fullUrl = 'https://app.asana.com/api/1.0/tasks?opt_fields=assignee,name,notes,workspace,projects,due_on,completed&assignee=me&completed_since=now&limit=10&workspace=' + workspace;

	$http({
	  method: 'GET',
	  url: fullUrl,
	  headers: {
		    'Authorization': bearer_token
		  } 
	}).success(function(data){
		
		deferred.resolve(data);
	}).error(function(msg, code){
		deferred.reject(msg);
		console.log(msg);
	});

	return deferred.promise;

};



this.markCompleted = function (id) {
	var deferred = $q.defer();
	var taskURL = 'https://app.asana.com/api/1.0/tasks/' + id;

	console.log(taskURL);

	$http({
	  method: 'PUT',
	  url: taskURL,
	  headers: {
		    'Authorization': bearer_token
		  },
		  data: {"data":
					{
					"completed": true
					}
				}
	}).success(function(data){
		deferred.resolve(data);
	}).error(function(msg, code){
		deferred.reject(msg);
		console.log(msg);
	});

	return deferred.promise;
};

this.createTask = function(p,n,t){
	var deferred = $q.defer();
	var taskURL = 'https://app.asana.com/api/1.0/tasks/';

	//console.log(taskURL);

	$http({
	  method: 'POST',
	  url: taskURL,
	  headers: {
		    'Authorization': bearer_token
		  },
		  data: {"data":
				{
				"completed": false,
				"due_on": t,
				"name": n,
				"projects": p,
				"assignee": "me"

				}
				}
	}).success(function(data){
		deferred.resolve(data);
	}).error(function(msg, code){
		deferred.reject(msg);
		console.log(msg);
	});

	return deferred.promise;
};



//end service
});
