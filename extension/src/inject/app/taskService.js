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


this.smokeTest = function (){
var tasks = [
	{
		"name": "Make video chat more clear",
		"notes" : "Major! Finish Immediately!",
		"projObj" : {
			"name": "Development"
		},
		"dueObj" : {
			"cal": "today",
			"date": "9/13"
		},
		"color": "light-orange",
		"service" : {
			"name": "GitHub",
			"img_url": "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
		}
	},
	{
		"name": "Video Chat Market Data from Jared",
		"notes" : "Detail & Summary",
		"projObj" : {
			"name": "Marketing"
		},
		"dueObj" : {
			"cal": "Tomorrow",
			"date": "9/14"
		},
		"color": "light-orange",
		"service" : {
			"name": "Trello",
			"img_url": "https://worldvectorlogo.com/logos/trello.svg"
		}
	},
	{
		"name": "Hire Video Streaming Devs",
		"notes" : "Need someone soon!",
		"projObj" : {
			"name": "HR"
		},
		"dueObj" : {
			"cal": "Friday",
			"date": "9/16"
		},
		"color": "light-orange",
		"service" : {
			"name": "Trello",
			"img_url": "https://worldvectorlogo.com/logos/trello.svg"
		}
	},
	{
		"name": "Find Jared a Place to Live",
		"notes" : "He needs to stop living here",
		"projObj" : {
			"name": "Personal"
		},
		"dueObj" : {
			"cal": "Friday",
			"date": "9/16"
		},
		"color": "light-orange",
		"service" : {
			"name": "Asana",
			"img_url": "https://asanatraining.com/wp-content/uploads/2016/07/Asana-Logo.png"
		}
	},
	{
		"name": "Check in with Johnson Account",
		"notes" : "Good Good",
		"projObj" : {
			"name": "Sales"
		},
		"dueObj" : {
			"cal": "Friday",
			"date": "9/16"
		},
		"color": "light-orange",
		"service" : {
			"name": "SalesForce",
			"img_url": "http://www.underconsideration.com/brandnew/archives/salesforce_logo_detail.png"
		}
	},
	{
		"name": "Fix Bug #13849",
		"notes" : "",
		"projObj" : {
			"name": "Development"
		},
		"dueObj" : {
			"cal": "next Tuesday",
			"date": "9/20"
		},
		"color": "light-orange",
		"service" : {
			"name": "GitHub",
			"img_url": "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
		}
	},
	
	{
		"name": "Hire Social Media Manager",
		"notes" : "Mostly for Twitter",
		"projObj" : {
			"name": "HR"
		},
		"dueObj" : {
			"cal": "next Tuesday",
			"date": "9/20"
		},
		"color": "light-orange",
		"service" : {
			"name": "Trello",
			"img_url": "https://worldvectorlogo.com/logos/trello.svg"
		}
	},
	{
		"name": "Meeting with Big Head",
		"notes" : "Important, Don't forget!",
		"projObj" : {
			"name": "Friends Calendar"
		},
		"dueObj" : {
			"cal": "next Tuesday",
			"date": "9/20"
		},
		"color": "light-orange",
		"service" : {
			"name": "Google Calendar",
			"img_url": "https://upload.wikimedia.org/wikipedia/en/f/f1/Google_Calendar_Logo.png"
		}
	},
	{
		"name": "Update Account Settings Page",
		"notes" : "Someone needs it soon!!!",
		"projObj" : {
			"name": "Development"
		},
		"dueObj" : {
			"cal": "next Friday",
			"date": "9/23"
		},
		"color": "light-orange",
		"service" : {
			"name": "GitHub",
			"img_url": "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
		}
	}
	
];


return tasks

};


//end service
});
