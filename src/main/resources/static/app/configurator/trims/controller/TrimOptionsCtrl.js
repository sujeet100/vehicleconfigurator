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
            var trimVariants = {};
            _.each($scope.trims, function(trim){
                trimVariants[trim.name] = _.filter($rootScope.trimOptions, function(option) {
                    return option.trim == trim.name;
                });
            });
            $rootScope.trimOptions = $rootScope.trimOptions;
            $rootScope.trimVariants = trimVariants;
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/trimvariant")
        };

  });
