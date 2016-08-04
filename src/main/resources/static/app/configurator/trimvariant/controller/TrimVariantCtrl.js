'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('TrimVariantCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, $location, MakeService) {

        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;

       $scope.selectedVariant = {
        styleId: undefined
       };

       MakeService.getCarImage($rootScope.trimVariants[0].styleId)
       .success(function(images){
           var carImages = _.find(images, function(image){
               return image.subType == 'interior';
           });

           var carImage = _.find(carImages.photoSrcs, function(photoSrc){
               return photoSrc.endsWith("600.jpg") || photoSrc.endsWith("500.jpg");
           });

           $scope.modelImage = $rootScope.imageBaseUrl + carImage;
       });

      var getWheelDrive = function(driveName) {
          if(driveName == 'rear wheel drive') {
              return '2WD';
          } else if (driveName == 'four wheel drive') {
              return '4WD';
          } else {
              return '2WD';
          }

      }

      $scope.variantChanged = function() {
        $scope.variant = _.find($rootScope.trimVariants, function(variant){
            return variant.styleId = $scope.selectedVariant.styleId;
        });
      };
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
            $rootScope.vehicleConfiguration.variantStyleId = $rootScope.selectedVariant.styleId;
            $rootScope.vehicleConfiguration.setValue('variantPrice', $rootScope.selectedVariant.price);
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/color")
        };

  });
