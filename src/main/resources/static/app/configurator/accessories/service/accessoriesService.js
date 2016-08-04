/**
 * Created by awaleg on 04/08/16.
 */
angular.module('configuratorApp')
    .service('AccessoriesService', function($http, $rootScope){
        this.getOptions = function(styleid) {
            return $http.get($rootScope.api.baseUrl + '/api/vehicle/v2/styles/' + styleid + '/options?category=Package&fmt=json&api_key='+$rootScope.api.key);
        };
        return this;
    });

