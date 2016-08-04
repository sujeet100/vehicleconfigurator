'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
    .controller('ColorCtrl', function ($scope, $routeParams, $rootScope, MakeService , $location, ColorService) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;
        $scope.interiorColors;
        $scope.exteriorColors;
        $scope.colorsFromColorChips;
        $scope.selectedColor = {
            interior: undefined,
            exterior: undefined
        };

        ColorService.getInteriorColorOptions($rootScope.selectedVariant.styleId)
        .success(function(response){
            $scope.interiorColors = response;
        });

        ColorService.getExteriorColorOptions($rootScope.selectedVariant.styleId)
        .success(function(response){
            $scope.exteriorColors = response;
        });


        $scope.fun = function(e) {
            this.style.background.color = "#" + this.colorChips.hex;
        };

        //Model Image
        MakeService.getCarImage($rootScope.vehicleConfiguration.variantStyleId)
            .success(function(images){
                var carImages = _.find(images, function(image){
                    return image.subType == 'exterior'&&image.shotTypeAbbreviation == 'FQ';
                });

                var carImage = _.find(carImages.photoSrcs, function(photoSrc){
                    return photoSrc.endsWith("600.jpg") || photoSrc.endsWith("500.jpg");
                });

                $rootScope.selectedImage = $scope.modelImage = $rootScope.imageBaseUrl + carImage;
            });

        $scope.next = function() {
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/accessories")
        };

        $scope.updateInteriorColorPrice = function() {
            $rootScope.vehicleConfiguration.setValue('interiorColorPrice', $scope.selectedColor.interior.price ? $scope.selectedColor.interior.price.baseMSRP : 0);
        };

        $scope.updateExteriorColorPrice = function() {
            $rootScope.vehicleConfiguration.setValue('exteriorColorPrice', $scope.selectedColor.exterior.price ? $scope.selectedColor.exterior.price.baseMSRP : 0);
        };

    });

