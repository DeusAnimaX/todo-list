'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','itemsService',function($scope,itemsService) {
	$scope.items = itemsService.getItems();
    $scope.itemType = itemsService.getTypes();
	$scope.classMap = {GROCERIES:"success", CAR:"danger", UNIVERSITY:"warning", PAYMENTS:"info", OTHER:"primary"};
    $scope.reverse = false;
    $scope.sortOption = "";
    $scope.filterBy = "";
    $scope.filterText = "";
    $scope.category = "";
    $scope.errorMsj = "Some fields are required, and cannot be in blank";
    $scope.showError = false;
    $scope.inEdition = false;
    $scope.sortName = "DES";
    $scope.view = 0;
    $scope.typeCompleted = 0;
    
    // ----------------------- SORT
    
    $scope.sortOrder = function(){
        $scope.reverse = !$scope.reverse;
        $scope.sortName = $scope.reverse? "ASC":"DES";
    };
    
    // ----------------------- FILTER
    
    $scope.selectFilter = function(){
        if($scope.filterBy == ""){
            $scope.filterText = "";
        }else{
            $scope.filterText = "false";
        }
    };
    
    // ----------------------- ITEMS LOGIC
    
    var itemIndex = -1;
    
    $scope.onDblClick = function(item){
        if(itemIndex >= 0){
            $scope.items[itemIndex].inEdition = false;
        }
        
        itemIndex = $scope.items.indexOf(item);
        
        $scope.item.type = item.type;
        $scope.item.description = item.description;
        $scope.item.finalDate = item.finalDate;
        
        item.inEdition = true;
        $scope.inEdition = true;
        $scope.view = 0;
    };
    
    $scope.calcPercentageCompleted = function(type){
        var totalItemsType = 0;
        var completedItems = 0;
        
        $scope.items.forEach(function(item){
            if(item.type == type){
                totalItemsType++;
            
                if(item.isDone)
                    completedItems++;
            }
        });
        
        $scope.itemTypeCompleted = type;
        $scope.typeCompleted = Math.round(completedItems/totalItemsType*100);
    };
    
    $scope.calcPercentageCompleted($scope.itemType[0]);
    
    $scope.removeSelection = function(){
        $scope.item.type = null;
        $scope.item.description = null
        $scope.item.finalDate = null;
        
        if(itemIndex != -1)
            $scope.items[itemIndex].inEdition = false;
        itemIndex = -1;
        
        $scope.inEdition = false;
    };
    
    // --------------------------- ITEMS CRUD
    
    $scope.addItem = function(item){
        if(item.finalDate != null && item.description != null && item.type != null){
            if(item.finalDate > new Date()){
                $scope.showError = false;
                
                item.isDone = false;
                item.date = new Date();
                $scope.items.push(item);
                
                $scope.calcPercentageCompleted(item.type);
                $scope.errorMsj = "Some fields are required, and cannot be in blank";
            }else{
                $scope.errorMsj = "Final date must be after than today";
                $scope.showError = true;
            }
        }else{
            $scope.errorMsj = "Some fields are required, and cannot be in blank";
            $scope.showError = true;
        }
    };
    
    $scope.updateItem = function(item){
        if(itemIndex >= 0 && $scope.inEdition){
            if(item.finalDate != null && item.description != null && item.type != null){
                if(item.finalDate > new Date()){
                    $scope.showError = false;
                    
                    $scope.items[itemIndex].type = item.type;
                    $scope.items[itemIndex].description = item.description;
                    $scope.items[itemIndex].finalDate = item.finalDate;
                    $scope.items[itemIndex].inEdition = false;
                    
                    itemIndex = -1;
                    $scope.inEdition = false;
                    $scope.calcPercentageCompleted(item.type);
                    $scope.errorMsj = "Some fields are required, and cannot be in blank";
                }else{
                    $scope.errorMsj = "Final date must be after than today";
                    $scope.showError = true;
                }
            }else{
                $scope.errorMsj = "Some fields are required, and cannot be in blank";
                $scope.showError = true;
            }
        }
    };
    
    $scope.removeItem = function(){
        if(itemIndex >= 0 && $scope.inEdition){
            var tempType = $scope.items[itemIndex].type;
            $scope.items.splice(itemIndex, 1);
            $scope.calcPercentageCompleted(tempType);
            $scope.removeSelection();
            itemIndex = -1;
        }
    };
    
    // ----------------------- CATEGORIES
    
    $scope.addCategory = function(category){
        if(category == ""){
            $scope.errorMsj = "Some fields are required, and cannot be in blank";
            $scope.showError = true;
        }else{
            $scope.showError = false;
            itemsService.addType(category);
            $scope.itemType = itemsService.getTypes();
        }
        
        $scope.classMap[category] = "primary";
    };
}]);