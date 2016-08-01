angular.module('configuratorApp')
.service('MakeService', function($http, $rootScope){
    this.getModels = function(make) {
        return $http.get($rootScope.api.baseUrl+'/api/vehicle/v2/'+make+'/models?state=new&view=basic&fmt=json&api_key='+$rootScope.api.key);
    }

    this.getCarImage = function(styleId){
        return $http.get($rootScope.api.baseUrl+'/v1/api/vehiclephoto/service/findphotosbystyleid?styleId='+styleId+'&fmt=json&api_key='+$rootScope.api.key);
    }
    return this;
});