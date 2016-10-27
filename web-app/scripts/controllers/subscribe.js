angular.module('zapexApp')
.controller('SubscribeCtrl', function ($scope, $rootScope, $stamplay, User, $location, LoginService){
  Stripe.setPublishableKey('pk_live_tNF9NHhsHbQDDKGNrKDP5wWh');

$scope.user;
$scope.processing = false;
$scope.message = "";

Stamplay.User.currentUser()
        .then(function(res) {
         $scope.user = res.user;
         $scope.$apply();
        }, function(err) {
            console.log(err);
              });


  $scope.card = {
    number: '',
    cvc: '',
    exp_month: '',
    exp_year: ''
  }

  $scope.pay = function(){
    $scope.processing = true;
    Stripe.card.createToken($scope.card, function(status, response){
      if (response.error) {
        console.log('error', response.error);
        $scope.processing = false;
      } else {
        var token = response.id;
        Stamplay.Stripe.createCreditCard($scope.user.id,token)
        .then(function(res) {
            var updatedInfo = {
              paid : true
            }

            Stamplay.User.update($scope.user.id, updatedInfo)
              .then(function(res) {
                $scope.$apply( function() {
                  $location.path('/user');
                  LoginService.setStatus(true);
                  });
              }, function(err) {
                $scope.message = "Looks like there was a problem, please try again."
                console.log(err);
                $scope.processing = false;
              })
        },
           function(err){
          console.log('')
        })
      }
    });
  }
});