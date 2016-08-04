angular.module('configuratorApp')
.directive('navBar', function(){
	return {
		return: 'EA',
		transclude: true,
		templateUrl: 'app/home/templates/navbar.html',
		link: function(){

		}
	}
})