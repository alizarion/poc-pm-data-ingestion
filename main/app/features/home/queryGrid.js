'use strict';

angular.module('share.ws.demo')
    .directive('queryGrid',['QueryField',function(QueryField){
    return {
        scope : {
            searchQueryFields : '='
        },
        templateUrl:'app/features/home/queryGrid.html',
        controller :['$scope', function($scope){

            if(!$scope.searchQueryFields){
                $scope.searchQueryFields.query =  [];
            }

            $scope.query = {};


            $scope.addQueryField = function(){
                $scope.searchQueryFields.query.push(new QueryField('','=='));
            };

            $scope.removeQueryField = function(field){
                var index = $scope.searchQueryFields.query.indexOf(field);
                if (index > -1) {
                    $scope.searchQueryFields.query.splice(index, 1);
                }
            }
        }]
    }
}]);