angular.module('configuratorApp')
.service('ColorService', function($http, $rootScope){
    this.getExteriorColorOptions = function(styleId) {
           return $http.get($rootScope.api.baseUrl + '/api/vehicle/v2/styles/' + styleId + '/colors?category=Exterior&view=full&fmt=json&api_key='+$rootScope.api.key);
    };

    this.getInteriorColorOptions = function(styleId) {
               return $http.get($rootScope.api.baseUrl + '/api/vehicle/v2/styles/' + styleId + '/colors?category=Interior&view=full&fmt=json&api_key='+$rootScope.api.key);
    };
    return this;
});