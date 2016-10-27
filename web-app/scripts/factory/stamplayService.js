angular.module('zapexApp').service('stamplayService', function ($q, $http) {


var _this = this;

this.getObjectbyID = function (c,id){
	var deferred = $q.defer();
	
		// c = class of object/ collection
		// id is the id of the specific object

	Stamplay.Object(c).get({ _id : id})
	    .then(function(res) {
	      deferred.resolve(res);
	    }, function(err) {
	      deferred.reject(err);
	    });	


	return deferred.promise;

};


this.updateObject = function (c,id,data){
	
		var deferred = $q.defer();
		
		console.log(c);
		console.log(id);
		console.log(data);

		// c = class of object/ collection
		// id is the id of the specific object
		// data is the data to send as the update


  Stamplay.Object(c).patch(id, data)
    .then(function(res) {
      deferred.resolve(res);
    }, function(err) {
      deferred.reject(err);
    })
	


	return deferred.promise;


};

this.createObject = function (){
	var deferred = $q.defer();
	
		// c = class of object/ collection
		// id is the id of the specific object
	var c = 'testing';
	var data = {
		'name' : "Taco"
	};


	Stamplay.Object(c).save(data)
    .then(function(res) {
      deferred.resolve(res);
    }, function(err) {
      deferred.reject(err);
    });


	return deferred.promise;

};


//end service
});
