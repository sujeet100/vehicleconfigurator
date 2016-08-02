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
    'ui-rangeSlider',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.cache = true;

    $routeProvider
      .when('/:make', {
        templateUrl: 'app/home/view/home.html',
        controller: 'HomeCtrl'
      })
      .when('/:make/:model/:year/configuration/powertrain', {
          templateUrl: 'app/configurator/powertrain/view/powertrain.html',
          controller: 'PowertrainCtrl'
      })
      .otherwise({
        redirectTo: '/mazda'
      });
  })
  .run(function($rootScope){
    $rootScope.api={};
    $rootScope.api.baseUrl = 'https://api.edmunds.com';
    $rootScope.api.key = 'pnsb29snfy4557kg7qanmu5z';
    $rootScope.imageBaseUrl = 'http://media.ed.edmunds-media.com';
  });
