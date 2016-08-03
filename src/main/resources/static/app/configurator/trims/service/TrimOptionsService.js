angular.module('configuratorApp')
.service('PowertrainService', function($http, $rootScope){
    this.getStyles = function(make, model, year) {
           return $http.get($rootScope.api.baseUrl + '/api/vehicle/v2/' + make + '/' + model + '/' + year + '/styles?state=new&view=full&fmt=json&api_key='+$rootScope.api.key);
    };
    return this;
});