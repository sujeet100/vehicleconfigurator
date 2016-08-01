'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('HomeCtrl', function ($scope, $routeParams, $rootScope, MakeService) {
    $scope.make = $routeParams.make;
    $scope.message = "Our vehicle configurator";
    MakeService.getModels($scope.make)
        .success(function(response){
            var models = response.models;
            _.each(models, function(model){
                if(model.years[0] && model.years[0].styles[0]){
                    var styleId = model.years[0].styles[0].id;

                    MakeService.getCarImage(styleId)
                    .success(function(images){
                        var carImages = _.find(images, function(image){
                            return image.shotTypeAbbreviation == 'FQ';
                        });

                        var carImage = _.find(carImages.photoSrcs, function(photoSrc){
                            return photoSrc.endsWith("600.jpg") || photoSrc.endsWith("500.jpg");
                        });

                        model.image = $rootScope.imageBaseUrl + carImage;
                    });

                }
            });


            $scope.models = response.models;
        })
        .error(function(error){
            console.log(error);
        });

  });
