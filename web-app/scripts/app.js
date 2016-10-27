'use strict';

Stamplay.init("magic-task");

/**
 * @ngdoc overview
 * @name zapexApp
 * @description
 * # zapexApp
 *
 * Main module of the application.
 */
angular
  .module('zapexApp', [
    'ngStamplay',
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'textAngular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/form', {
        templateUrl: 'views/form.html',
        controller: 'FormCtrl',
        controllerAs: 'form'
      })
      .when('/edit/:connID', {
        templateUrl: 'views/edit.html',
        controller: 'editCtrl',
        controllerAs: 'edit'
      })
       .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
       .when('/subscribe', {
        templateUrl: 'views/subscribe.html',
        controller: 'SubscribeCtrl',
        controllerAs: 'subscribe'
      })
       .when('/extension', {
        templateUrl: 'views/extension.html',
        controller: 'ExtensionCtrl',
        controllerAs: 'extension'
      })
       .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
       .when('/success/:appName', {
        templateUrl: 'views/success.html',
        controller: 'SuccessCtrl'
      })
       .when('/setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupTaskCtrl',
        controllerAs: 'setuptask'
      })
       .when('/oauth', {
        templateUrl: 'views/oauth.html',
        controller: 'OauthCtrl'
       })
       .when('/smoke', {
        templateUrl: 'views/smoke.html',
        controller: 'SmokeCtrl'
       })
      .otherwise({
        redirectTo: '/'
      });
  });