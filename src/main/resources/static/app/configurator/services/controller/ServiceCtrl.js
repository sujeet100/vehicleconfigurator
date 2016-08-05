'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('configuratorApp')
    .controller('ServiceCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, $location) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;

        $scope.services = [
            {
                name: "Service1",
                price: 600,
                description: "3 year Service Plan"
            },
            {
                name: "Service2",
                price: 800,
                description: "5 year Service Plans"
            }
        ];
        $scope.selectedService = {};
        $scope.selectedService.name = "";

        $scope.warantees = [
            {
                name: "Warantee1",
                price: 339,
                description: "1 year upto 60000 miles Extended Warantee"
            },
            {
                name: "Warantee2",
                price: 668,
                description: " 2 year upto 100000 miles Extended Warantee"
            },
            {
                name: "Warantee3",
                price: 968,
                description: "3 year upto 120000 miles Extended Warantee"
            }
        ]

        $scope.selectedWarantee = {};
        $scope.selectedWarantee.name = "";


        $scope.updateService = function() {
            if (!$scope.selectedService.name) {
                $rootScope.vehicleConfiguration.setValue('serviceName', '');
                $rootScope.vehicleConfiguration.setValue('serviceDesription', '');
                $rootScope.vehicleConfiguration.setValue('servicePrice', 0);
            }
            else {
                _.each($scope.services, function (service) {
                    if (service.name == $scope.selectedService.name) {
                        $rootScope.vehicleConfiguration.setValue('serviceName', service.name);
                        $rootScope.vehicleConfiguration.setValue('serviceDesription', service.description);
                        $rootScope.vehicleConfiguration.setValue('servicePrice', service.price ? service.price : 0);
                    }
                });
            }
        }

        $scope.updateWarantee = function() {
            if (!$scope.selectedWarantee.name) {
                $rootScope.vehicleConfiguration.setValue('warrantyName', '');
                $rootScope.vehicleConfiguration.setValue('warrantyDescription', '');
                $rootScope.vehicleConfiguration.setValue('warrantyPrice', 0);
            }
            else {
                _.each($scope.warantees, function (warantee) {
                    if (warantee.name == $scope.selectedWarantee.name) {
                        $rootScope.vehicleConfiguration.setValue('warrantyName', warantee.name);
                        $rootScope.vehicleConfiguration.setValue('warrantyDescription', warantee.description);
                        $rootScope.vehicleConfiguration.setValue('warrantyPrice', warantee.price ? warantee.price : 0);
                    }
                });
            }
        }

        $scope.next = function() {
/*            $rootScope. = _.sortBy($scope.filteredPowertrains, function(powertrain) {
                return powertrain.price;
            });*/
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/summery");
        };
    });
