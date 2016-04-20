'use strict';

angular.module('myApp.items.directive', [])
.directive('itemSwitch', [function() {
	return {
        restrict: 'A',
        scope: {
            item: '=',
            itemIndex: '='
        },
        templateUrl: 'templates/itemSwitchTemplate.html'
    }
}]);