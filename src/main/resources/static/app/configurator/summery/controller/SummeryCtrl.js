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
        $scope.make = "volkswagen";
        $scope.modelNiceName = "beetle-convertible";
        $scope.modelYear = "2015";


        $scope.next = function() {
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/summery");
        }

        $scope.VehicleConfigurationData = $rootScope.vehicleConfiguration;

    });
