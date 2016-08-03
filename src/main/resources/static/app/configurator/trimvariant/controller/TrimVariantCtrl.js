'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('TrimVariantCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, $location) {

       $scope.selectedVariant = {
        styleId: undefined
       };
      var getWheelDrive = function(driveName) {
          if(driveName == 'rear wheel drive') {
              return '2WD';
          } else if (driveName == 'four wheel drive') {
              return '4WD';
          } else {
              return '2WD';
          }

      }
        $scope.variants = _.map($rootScope.trimVariants, function(variant){
            return {
                     styleId: variant.styleId,
                     engineName:variant.engine.name,
                     description: variant.engine.size+"L " + variant.transmission + " " + getWheelDrive(variant.drivenWheels) + " " + variant.numOfDoors + " doors",
                     price: variant.price
                 }
        });

        $scope.next = function() {
            $rootScope.selectedVariant = _.find($rootScope.trimVariants, function(variant){
                return variant.styleId = $scope.selectedVariant.styleId;
            });
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/color")
        };

  });
