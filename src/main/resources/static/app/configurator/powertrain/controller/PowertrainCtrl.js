'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('PowertrainCtrl', function ($scope, $routeParams, $rootScope, PowertrainService) {
    $scope.make = $routeParams.make;
    $scope.modelNiceName = $routeParams.model;
    $scope.modelYear = $routeParams.year;
    PowertrainService.getStyles($scope.make, $scope.modelNiceName, $scope.modelYear)
        .success(function(response){
            var styles = response.styles;
            var powertrains = _.map(styles, function(style) {
                var powerTrain = new Powertrain();
                powerTrain.fuelType = style.engine.type;
                powerTrain.engineCapacity = style.engine.size;
                powerTrain.transmission = style.transmission.transmissionType;
                powerTrain.price = style.price.baseMSRP;
                return powerTrain;
            });

            var filtersSelections = {
                fuelType: new Set(),
                engineCapacity: new Set(),
                transmission: new Set()
            };

            _.each(powertrains, function(powertrain){
                filtersSelections.fuelType.add(powertrain.fuelType);
                filtersSelections.engineCapacity.add(powertrain.engineCapacity);
                filtersSelections.transmission.add(powertrain.transmission);
            });

            console.log(filtersSelections.fuelType)

        });

  });
