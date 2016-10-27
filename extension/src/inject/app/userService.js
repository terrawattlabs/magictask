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

this.replyWithHello = function(){
  console.log('in reply with ehllo function');
  return "hello world";
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

this.logout = function (){
  var deferred = $q.defer();


  Stamplay.User.logout(true, function(err, res){
    console.log("logged out");
    deferred.resolve(res);
  });


  return deferred.promise;

};


this.pullMTConnections = function (u){
  console.log('got to pull connections service');
	var deferred = $q.defer();

  console.log(u);
	var query = {
    user : u
  };

console.log(query);


  Stamplay.Object("connections").findByCurrentUser()
    .then(function(res) {
      console.log(res);
      deferred.resolve(res);
    }, function(err) {
      deferred.resolve(err);
    })


	return deferred.promise;

};



//end service
});
