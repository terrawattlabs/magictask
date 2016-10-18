angular.module('app').service('taskService', function ($q, $http) {

// SET YOUR WORKSPACE AND AUTHORIZATION VARIABLES HERE!!!

var workspace = 64385798792062; // Only one workspace available right now, can update this in the future.



var personal_token = '0/d1b679d62915f096030442a49841eddf'; 
var bearer_token = 'Bearer ' + personal_token;



//setup asana credentials

var CLIENT_ID = '192803788558688';
var REDIRECT_URI = 'http://localhost:8080/popup_receiver.html';


// END SETTING CUSTOM VARIABLES



var _this = this;

this.refreshToken = function(r){
	var deferred = $q.defer();

	// var token = t;
	// var token_expiry = exp;
	// var refresh_token = r;

	var url = 'https://jacksserver.herokuapp.com/magictask/asana/refresh';
 	var data = {refresh: r};

	var config = {};

	$http.post(url,data,config)
	.then(function(response){
		
		deferred.resolve(response);
	}, function(error){
		console.log('error');
		console.log(error);
		deferred.reject(error);
	});

	return deferred.promise;

};


this.getProjects = function (arr){

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



this.updateTask = function (id,d) {
	var deferred = $q.defer();
	var taskURL = 'https://app.asana.com/api/1.0/tasks/' + id;


	console.log(taskURL);

	$http({
	  method: 'PUT',
	  url: taskURL,
	  headers: {
		    'Authorization': bearer_token
		  },
		  data: {"data": d
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

this.pullTasksByProject = function (array,a) {

	var promises = [];
	var bearer_token = 'Bearer '+ a;

angular.forEach(array, function(x) {
	  var deferred = $q.defer();
	  var fullUrl = 'https://app.asana.com/api/1.0/projects/' + x.project + '/tasks?opt_fields=id,assignee,workspace,projects,notes,name,due_on,due_at,completed,completed_at,created_at&assignee=me&completed_since=now';
      
      var promise = $http({
		  method: 'GET',
		  url: fullUrl,
		  headers: {
			    'Authorization': bearer_token
			  } 
				}).success(function(data){
					//console.log(data);	
					deferred.resolve(data);
				}).error(function(msg, code){
					deferred.reject(msg);
					console.log(msg);
				});

        promises.push(promise);
    });

    return $q.all(promises);
};


this.pullProjectInfo = function (array,a) {

	var promises = [];
	var bearer_token = 'Bearer '+ a;

angular.forEach(array, function(x) {
	  var deferred = $q.defer();
	  var fullUrl = 'https://app.asana.com/api/1.0/projects/' + x.project + '?opt_fields=workspace,notes,color,team,followers,members,public,created_at,modified_at,archived,name,id,owner,current_status,due_date';
      
      var promise = $http({
		  method: 'GET',
		  url: fullUrl,
		  headers: {
			    'Authorization': bearer_token
			  } 
				}).success(function(data){
					//console.log(data);	
					deferred.resolve(data);
				}).error(function(msg, code){
					deferred.reject(msg);
					console.log(msg);
				});

        promises.push(promise);
    });

    return $q.all(promises);
};



//end service
});
