/**
 * Created by awaleg on 04/08/16.
 */
angular.module('configuratorApp')
    .controller('AccessoriesCtrl', function ($scope, $routeParams, $rootScope, PowertrainService, AccessoriesService, $location, MakeService) {
        $scope.make = $routeParams.make;
        $scope.modelNiceName = $routeParams.model;
        $scope.modelYear = $routeParams.year;

        AccessoriesService.getOptions($rootScope.selectedVariant.styleId)
            .success(function(response) {
                var options = response.options;
                $scope.options = options;
            });
        $scope.optionsSelected = {};
        $scope.optionsSelected.values = [];

    });