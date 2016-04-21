'use strict';

angular.module('myApp.items.service', [])

.service('itemsService',function() {
    var itemType = [
        "GROCERIES",
        "CAR",
        "UNIVERSITY",
        "PAYMENTS",
        "OTHER"
    ];
    
    this.getTypes = function(){
        return itemType;
    }
    
    this.addType = function(val){
        itemType.push(val);
    }
    
    this.removeType = function(val){
        itemType.slice(itemType.indexOf(val), 1);
    }
    
    var items = [ // date: MM/dd/YYYY
        {type:itemType[0], description:"Buy Milk",                   isDone:true,  date:new Date("02/13/2016"), finalDate:new Date("02/14/2016")},
        {type:itemType[1], description:"Wash Car",                   isDone:false, date:new Date("03/10/2016"), finalDate:new Date("03/13/2016")},
        {type:itemType[2], description:"Proy 3 To Do List Homework", isDone:false, date:new Date("02/24/2016"), finalDate:new Date("02/26/2016")},
        {type:itemType[3], description:"Pay Cenfotec",               isDone:true,  date:new Date("01/05/2016"), finalDate:new Date("01/06/2016")},
        {type:itemType[3], description:"Pay PSN Plus",               isDone:false, date:new Date("04/14/2016"), finalDate:new Date("04/15/2016")}
    ];

    this.getItems = function(){
        return items;
    };
});
