'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('TrimOptionsCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, TrimoptionService, $location) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;
        $scope.trims = [];
        _.each($rootScope.trimOptions, function(option){
            if(!_.some($scope.trims, function(e){return e.name == option.trim})) {
                var trimOption = new TrimOption();
                trimOption.name = option.trim;
                trimOption.price = option.price;
                trimOption.styleId = option.styleId;
                TrimoptionService.getStyles(option.styleId)
                    .success(function(response){
                        var equipment = response.equipment;
                        //console.log(equipment);
                        var stylelist = ['Brake System', 'Drive Type', 'Security', 'Airbags'];
                        _.each(equipment, function(e){
                            if(stylelist.indexOf(e.name) != -1) {
                                trimOption.equipmentstyles.push({
                                    stylename: e.name,
                                    stylevalue: e.attributes

                                })
                            }
                        });
                        console.log(trimOption.equipmentstyles);
                    })

                $scope.trims.push(trimOption);
            }
        });

        $scope.next = function() {
            var selectedTrim = _.find($scope.trims,function(trim){
                return trim.styleId == $scope.trimselected.styleid;
            }).name;
            $rootScope.trimVariants = _.filter($rootScope.trimOptions, function(option) {
                return option.trim == selectedTrim;
            });
            $rootScope.trimOptions = $rootScope.trimOptions;
            $rootScope.selectedTrim = selectedTrim;
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/trimvariant")
        };

      $scope.trimselected = {};
      $scope.trimselected.styleid = "";

  });
