angular.module('app').service('userService', function ($q, $http, $timeout) {






function simulateUserHTTP (u, p){
	var userInfo = {
		"asanaID": "randomdigits12345",
		"workspaceID": "myfavoriteworkspaceID",
		"plan": "free"
	};

	return userInfo
};

var _this = this;


this.getCredentials = function (username, pass){
	var deferred = $q.defer();

	$timeout(function(){
		deferred.resolve(simulateUserHTTP(username, pass))
	}, 4000);

	return deferred.promise;

};



//end service
});
