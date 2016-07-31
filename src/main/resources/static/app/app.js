'use strict';

/**
 * @ngdoc overview
 * @name angularappApp
 * @description
 * # angularappApp
 *
 * Main module of the application.
 */
angular
  .module('configuratorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/view/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
