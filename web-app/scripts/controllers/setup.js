angular.module('zapexApp')
  .controller('SetupTaskCtrl', function ($scope, $routeParams, $location, $http, appService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.user;
var url = 'https://app.asana.com/-/oauth_token';
 var data = $.param({
                grant_type: 'authorization_code',
                client_id: '192803788558688',
                client_secret: 'e23526b7eb519cdfb53459eed6737e52',
                redirect_uri: 'https://magic-task.stamplayapp.com',
                code: "0%2Fe672ee09c950da6f52d8337f3160479d"
            });

var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

$scope.runPost = function() {
	$http.post(url,data,config)
	.then(function(response){
		console.log('success');
		console.log(response);
	}, function(error){
		console.log('error');
		console.log(error);
	});


};


	

  });


