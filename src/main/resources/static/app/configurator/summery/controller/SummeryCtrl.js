'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
    .controller('SummeryCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, $location) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;

        $scope.next = function() {
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/summery");
        }

        $scope.VehicleConfigurationData = $rootScope.vehicleConfiguration;

    });
