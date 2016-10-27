angular.module('zapexApp').service('asanaService', function ($q, $http) {


var _this = this;

this.getObjectbyID = function (c,id){
	var deferred = $q.defer();
	
		// c = class of object/ collection
		// id is the id of the specific object

	Stamplay.Object(c).get({ _id : id})
	    .then(function(res) {
	      deferred.resolve(res);
	    }, function(err) {
	      deferred.reject(msg);
	    });	


	return deferred.promise;

};


//end service
});
