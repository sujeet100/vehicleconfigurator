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
    $scope.budget = {};
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
            $scope.powertrains = powertrains;

            var filtersSelections = {
                fuelType: [],
                engineCapacity: [],
                transmission: [],
                minPrice: 0,
                maxPrice: 0
            };



            _.each(powertrains, function(powertrain){
                var dimensions = ["fuelType", "engineCapacity", "transmission"];
                _.each(dimensions, function(dimension){
                    if(!_.some(filtersSelections[dimension], function(e) { return e.value == powertrain[dimension]})) {
                        filtersSelections[dimension].push({'value': powertrain[dimension], 'enable': true});
                    }
                });
            });

            filtersSelections.maxPrice = _.max(powertrains, function(powertrain){
                return powertrain.price;
            }).price;

            $scope.budget.max = filtersSelections.maxPrice;

            filtersSelections.minPrice = _.min(powertrains, function(powertrain){
                return powertrain.price;
            }).price;

            $scope.budget.min = filtersSelections.minPrice;

            $scope.filtersSelections = filtersSelections;
        });

        $scope.filterOptions = function(){

            var filteredPowertrains = _.filter($scope.powertrains, function(powertrain){
                return powertrain.price >= $scope.budget.min && powertrain.price <= $scope.budget.max;
            });

            var newFiltersSelections = {
                fuelType: [],
                engineCapacity: [],
                transmission: []
            };

            _.each(filteredPowertrains, function(filteredPowertrain){
                var dimensions = ["fuelType", "engineCapacity", "transmission"];
                _.each(dimensions, function(dimension){
                    if(!_.some(newFiltersSelections[dimension], function(e) { return e.value == filteredPowertrain[dimension]})) {
                        newFiltersSelections[dimension].push({'value': filteredPowertrain[dimension], 'enable': true});
                    }
                });
            });


            var dimensions = ["fuelType", "engineCapacity", "transmission"];
            _.each(dimensions, function(dimension){
                _.each($scope.filtersSelections[dimension], function(originalOption){
                    if(_.some(newFiltersSelections[dimension], function(newOption) { return newOption.value == originalOption.value})) {
                        originalOption.enable = true;
                    }
                    else {
                        originalOption.enable = false;
                    }
                })
             });
        }

  });
