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
        $scope.selectedids = {};
        $scope.selectedids.ids = [];

        $scope.selectAccessoriesOptions = function(){
            $scope.optionsSelected = [];
            _.each($scope.options, function(o){
                if($scope.selectedids.ids.indexOf(o.id) != -1 && !_.some($scope.optionsSelected, function(e) { return e.id == o.id})){
                    $scope.optionsSelected.push({
                        name: o.name,
                        id: o.id,
                        price: o.price.baseMSRP
                    });
                }
            });
            $rootScope.vehicleConfiguration.setValue('accessories', $scope.optionsSelected);
        }
        $scope.next = function() {
            $location.path("/" + $scope.make + "/" + $scope.modelNiceName + "/" + $scope.modelYear + "/configuration/services");
        };
    });