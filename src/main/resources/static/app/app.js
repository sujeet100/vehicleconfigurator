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
    'ngTouch',
    'checklist-model'
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
      .when('/:make/:model/:year/configuration/trims', {
          templateUrl: 'app/configurator/trims/view/trimoptions.html',
          controller: 'TrimOptionsCtrl'
      })
      .when('/:make/:model/:year/configuration/trimvariant', {
        templateUrl: 'app/configurator/trimvariant/view/trimvariant.html',
        controller: 'TrimVariantCtrl'
      })
      .when('/:make/:model/:year/configuration/color', {
        templateUrl: 'app/configurator/color/view/color.html',
          controller:'ColorCtrl',
      })
      .when('/:make/:model/:year/configuration/accessories', {
        templateUrl: 'app/configurator/accessories/view/accessories.html',
          controller:'AccessoriesCtrl',
      })
      .when('/:make/:model/:year/configuration/services', {
        templateUrl: 'app/configurator/services/view/services.html',
        controller:'ServiceCtrl',
      })
      .when('/:make/:model/:year/configuration/summery', {
        templateUrl: 'app/configurator/summery/view/summery.html',
        controller:'SummeryCtrl',
      })
      .otherwise({
        redirectTo: '/mazda'
      });
  })
  .run(function($rootScope){
    $rootScope.api={};
    $rootScope.api.baseUrl = 'https://api.edmunds.com';
    // $rootScope.api.key = 'pnsb29snfy4557kg7qanmu5z';
    $rootScope.api.key = 'rr6wfcv23kx5vxxjc79v2v8n';
    
    $rootScope.imageBaseUrl = 'http://media.ed.edmunds-media.com';
    $rootScope.vehicleConfiguration = new VehicleConfiguration();
  });
