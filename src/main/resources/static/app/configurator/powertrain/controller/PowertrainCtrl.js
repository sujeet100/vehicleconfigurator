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
                fuelType: [],
                engineCapacity: [],
                transmission: []
            };

            _.each(powertrains, function(powertrain){
                var types = ["fuelType", "engineCapacity", "transmission"];
                _.each(types, function(type){
                    if(filtersSelections[type].indexOf(powertrain[type]) == -1){
                        filtersSelections[type].push(powertrain[type]);
                    }
                });
            });

            $scope.filtersSelections = filtersSelections;
        });

  });
