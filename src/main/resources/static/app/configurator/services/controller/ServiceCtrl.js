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

        $scope.services = {
            service1 : {
                name: "Service1",
                price: 600,
                description: "3 year Service Plan"
            },
            service2 : {
                name: "Service2",
                price: 800,
                description: "5 year Service Plans"
            }
        }

        $scope.warantee = {
            warantee1 : {
                name: "Warantee1",
                price: 339,
                description: "1 year upto 60000 miles Extended Warantee"
            },
            warantee2 : {
                name: "Warantee2",
                price: 668,
                description: " 2 year upto 100000 miles Extended Warantee"
            },
            warantee3 : {
                name: "Warantee2",
                price: 668,
                description: "3 year upto 120000 miles Extended Warantee"
            }
        }



        $scope.next = function() {
            $rootScope.trimOptions = _.sortBy($scope.filteredPowertrains, function(powertrain) {
                return powertrain.price;
            });
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/trims")
        };
    });
