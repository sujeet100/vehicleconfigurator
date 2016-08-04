angular.module('configuratorApp')
.directive('customFooter', function(){
	return {
		return: 'EA',
		transclude: true,
		scope: {
			showButton: '=',
			nextClick: '&'
		},
		templateUrl: 'app/home/templates/footer.html',
		link: function(){

		}
	}
})