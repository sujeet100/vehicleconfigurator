angular.module('configuratorApp')
    .service('ModelPictureService', function($http, $rootScope){
        /*this.getStyles = function(styleid) {
            return $http.get($rootScope.api.baseUrl + '/api/vehicle/v2/styles/' + styleid + '/equipment?availability=standard&equipmentType=OTHER&fmt=json&api_key='+$rootScope.api.key);
        };*/
        return $http.get('http://media.ed.edmunds-media.com/audi/a6/2013/oem/2013_audi_a6_sedan_30t-premium-quattro_f_oem_1_98.jpg');
    });