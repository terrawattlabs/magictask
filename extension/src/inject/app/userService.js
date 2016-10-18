angular.module('app').service('userService', function ($q, $http, $timeout) {
Stamplay.init("magic-task");


var _this = this;


var tokens = {
  'asana' : '',
  'trello': ''
};

this.setToken = function (service, token) {
  if (service == 'asana') {
    tokens.asana = token;
  }

};

this.getToken = function (service) {
  if (service == 'asana') {
    return tokens.asana;
  }
};

this.login = function (username, pass){
	var deferred = $q.defer();


	var credentials = {
    	email : username,
   		password : pass
  	};

  Stamplay.User.login(credentials)
    .then(function(res) {
      deferred.resolve(res);
    }, function(err) {
       deferred.reject(err); 
    });


	return deferred.promise;

};


this.pullConnections = function (user){
	var deferred = $q.defer();


	var query = {
    owner : user
  }

  Stamplay.Object("connections").get(query)
    .then(function(res) {
      deferred.resolve(res);
    }, function(err) {
      deferred.resolve(err);
    })


	return deferred.promise;

};



//end service
});
