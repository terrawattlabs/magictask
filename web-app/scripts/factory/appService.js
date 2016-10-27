angular.module('zapexApp').service('appService', function ($q, $http) {


//setup asana credentials

var CLIENT_ID = '192803788558688';
var REDIRECT_URI = 'http://localhost:8080/popup_receiver.html';


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

this.getWorkspaces = function (t,r){

	var deferred = $q.defer();
	
	var fullUrl = 'https://app.asana.com/api/1.0/workspaces';

	this.refreshToken(r).then(function(d){
		console.log(d.data);

		var bearer_token = 'Bearer ' + d.data.access_token;

		console.log(bearer_token);

		$http({
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
	});

	

	

	return deferred.promise;

};





this.getProjects = function (t,w, r){
	var deferred = $q.defer();

	this.refreshToken(r).then(function(d){

	var bearer_token = 'Bearer ' + d.data.access_token;
	
	var fullUrl = 'https://app.asana.com/api/1.0/workspaces/' + w + '/projects?opt_fields=color,name';

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
}); // end refresh token promise

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



//end service
});
