'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
  .controller('TrimOptionsCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, $location) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;
        $scope.trims = [];
        _.each($rootScope.trimOptions, function(option){
            if(!_.some($scope.trims, function(e){return e.name == option.trim})) {
                var trimOption = new TrimOption();
                trimOption.name = option.trim;
                trimOption.price = option.price;
                $scope.trims.push(trimOption);
            }
        });

        $scope.next = function() {
            var selectedTrim = $scope.trims[0].name
            $rootScope.trimVariants = _.filter($rootScope.trimOptions, function(option) {
                return option.trim == selectedTrim;
            });
            $rootScope.trimOptions = $rootScope.trimOptions;
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/trimvariant")
        };

  });
