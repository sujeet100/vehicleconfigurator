'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
    .controller('ColorCtrl', function ($scope, $routeParams, $rootScope, MakeService , $location) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;
        $scope.interiorColors;
        $scope.exteriorColors;
        $scope.colorsFromColorChips;

        var interiorColors = _.find($rootScope.selectedVariant['colors'],function(colorType){
            return colorType.category == "Interior";
        });

        var exteriorColors = _.find($rootScope.selectedVariant['colors'],function(colorType){
            return colorType.category == "Exterior";
        });

        var colorsFromColorChips = _.each(interiorColors.options.colorChips, function(colorChip){
            console.log(colorChip.hex);
            return "#" + colorChip.hex;
        });

        $scope.fun = function(e) {
            this.style.color = "#" + this.colorChips.hex;
        };

        $scope.interiorColors = interiorColors;
        $scope.exteriorColors = exteriorColors;
        $scope.colorsFromColorChips = colorsFromColorChips;
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
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/NextPage")
        };

    });

