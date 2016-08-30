angular.module('app').service('taskService', function ($q, $http) {

// SET YOUR WORKSPACE AND AUTHORIZATION VARIABLES HERE!!!

//var workspace = 64385798792062; // Only one workspace available right now, can update this in the future.

var workspace = 134656470675157;

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
		console.log(data.data);
		deferred.resolve(data);
	}).error(function(msg, code){
		deferred.reject(msg);
		console.log(msg);
	});

	return deferred.promise;

};

this.getTasks = function(pjs) {

	var deferred = $q.defer();
	var promises = [];

    angular.forEach(pjs , function(pj) {

    	var projID = pj.id;
    	var projurl = "https://app.asana.com/api/1.0/projects/" + projID + "/tasks?opt_fields=assignee,id,completed_at,due_on,due_at,name,projects&limit=20&completed_since=now&assignee=me";

        var promise = $http({
            url   : projurl,
            method: 'GET',
             headers: {
		    			'Authorization': bearer_token
		  			  } 
        });

        promises.push(promise);

    });

    $q.all(promises)
    .then(
            function(results) {
            deferred.resolve(
             results
          )},
          function(errors) {
            deferred.reject(errors);
          },
          function(updates) {
            deferred.update(updates);
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
