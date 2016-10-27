angular.module('zapexApp').factory('User', ['$q', '$stamplay', function ($q, $stamplay){

  
  function login() {
    
    var deferred = $q.defer();

    var User = $stamplay.User().Model;
    User.login().then(function(){
      deferred.resolve(User);
    });
  }

  function active() {
    var deferred = $q.defer();

    var User = $stamplay.User().Model;
    User.currentUser().then(function() {
      deferred.resolve(User);
    }).catch(function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function logout() {
    var User = $stamplay.User().Model;
    User.logout();
  }

  return {
    active: active,
    logout: logout,
    login: login
  }
}]);
