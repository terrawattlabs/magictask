angular.module('app').service('userService', function ($q, $http, $timeout) {
Stamplay.init("magic-task");





function simulateUserHTTP (u, p){
	var userInfo = {
		"asanaID": "randomdigits12345",
		"workspaceID": "myfavoriteworkspaceID",
		"plan": "free"
	};

	return userInfo
};

var _this = this;


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
