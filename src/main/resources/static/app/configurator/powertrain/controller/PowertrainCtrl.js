'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('PowertrainCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, $location) {
    $scope.make = $routeParams.make;
    $scope.modelNiceName = $routeParams.model;
    $scope.modelYear = $routeParams.year;
    $scope.budget = {};
    $scope.CurrentModelLength = 0;
    PowertrainService.getStyles($scope.make, $scope.modelNiceName, $scope.modelYear)
        .success(function(response){
            var styles = response.styles;
            var powertrains = _.map(styles, function(style) {
                var powerTrain = new Powertrain();
                powerTrain.fuelType = style.engine.type;
                powerTrain.engineCapacity = style.engine.size;
                powerTrain.transmission = style.transmission.transmissionType;
                powerTrain.price = style.price.baseMSRP;
                powerTrain.engine = style.engine;
                powerTrain.colors = style.colors;
                powerTrain.options = style.options;
                powerTrain.styleId = style.id;
                powerTrain.trim = style.trim;
                return powerTrain;
            });
            $scope.powertrains = powertrains;
            $scope.CurrentModelLength = $scope.powertrains.length;

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

        $scope.filterOptionsOnPriceChange = function(){

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
            $scope.CurrentModelLength = filteredPowertrains.length;
        }
        $scope.masterTooltip = "";
        $scope.iHoverEvent = function(){
                // Hover over code
            var masterTooltip = angular.element(document.querySelector('masterTooltip'));
            var title = masterTooltip.attr('title');
            masterTooltip.data('tipText', title).removeAttr('title');
            var tooltip = angular.element(document.querySelector('tooltip'));
            tooltip.text(title)
                .appendTo('body')
                .fadeIn('slow');
            $scope.masterTooltip = masterTooltip;
            console.log('MH');
            };

        $scope.iMoveEvent = function(e) {
            var tooltip = angular.element(document.querySelector('tooltip'));
            $scope.masterTooltip.attr('title', $scope.masterTooltip.data('tipText'));
            tooltip.remove();
            console.log('MHF');
            console.log('MM');
            var mousex = e.pageX + 20; //Get X coordinates
            var mousey = e.pageY + 10; //Get Y coordinates
            var tooltip = angular.element(document.querySelector('tooltip'));
            tooltip.css({ top: mousey, left: mousex })
        };

      $scope.filterOptionsOnDimensionChange = function() {
          var filteredPowertrains = _.filter($scope.powertrains, function(powertrain){

              if(powertrain.price >= $scope.budget.min && powertrain.price <= $scope.budget.max) {
                  if(!$scope.fuelSelected.values.length || $scope.fuelSelected.values.indexOf(powertrain['fuelType']) != -1){
                      if(!$scope.engineCapacitySelected.values.length || $scope.engineCapacitySelected.values.indexOf(powertrain['engineCapacity']) != -1){
                          if(!$scope.transmissionSelected.values.length || $scope.transmissionSelected.values.indexOf(powertrain['transmission']) != -1) {
                              return true;
                          }
                      }
                  }
              }
              return false;
          });

          $scope.CurrentModelLength = filteredPowertrains.length;

          var newFiltersSelections = {
              fuelType: [],
              engineCapacity: [],
              transmission: []
          };
      }
      $scope.fuelSelected = {};
      $scope.fuelSelected.values = [];

      $scope.engineCapacitySelected = {};
      $scope.engineCapacitySelected.values = [];

      $scope.transmissionSelected = {};
      $scope.transmissionSelected.values = [];

      $scope.next = function() {
        $rootScope.trimOptions = _.sortBy($scope.powertrains, function(powertrain) {
            return powertrain.price;
        });
        $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/trims")
      };

  });
