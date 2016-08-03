angular.module('configuratorApp')
    .service('TrimoptionService', function($http, $rootScope){
        this.getStyles = function(styleid) {
            return $http.get($rootScope.api.baseUrl + '/api/vehicle/v2/styles/' + styleid + '/equipment?availability=standard&equipmentType=OTHER&fmt=json&api_key='+$rootScope.api.key);
        };
        return this;
    });