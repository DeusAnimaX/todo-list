'use strict';

angular.module('myApp.items.date', [])
.directive('itemFinalDate', [function() {
	return {
        restrict: 'A',
        scope: {
            item: '='
        },
        templateUrl: 'templates/itemFinalDate.html'
    }
}]);