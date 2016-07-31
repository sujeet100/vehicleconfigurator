'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.message = "Our vehicle configurator";
  });
