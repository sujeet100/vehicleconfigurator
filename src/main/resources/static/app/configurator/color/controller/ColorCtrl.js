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
        MakeService.getCarImage($rootScope.trimVariants[0].styleId)
            .success(function(images){
                var carImages = _.find(images, function(image){
                    return image.subType == 'exterior'&&image.shotTypeAbbreviation == 'FQ';
                });

                var carImage = _.find(carImages.photoSrcs, function(photoSrc){
                    return photoSrc.endsWith("600.jpg") || photoSrc.endsWith("500.jpg");
                });

                $scope.modelImage = $rootScope.imageBaseUrl + carImage;
            });

        $scope.next = function() {
            console.log(interiorColors);
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/accessories")
        };

    });

