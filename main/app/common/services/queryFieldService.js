

angular.module('share.ws.demo')
    .factory('QueryField',[function($scope){

        var QueryField =  function(key,operator,value){
            this.key =  key;
            this.operator = operator;
            this.value  = value;
        };

        QueryField.prototype.getQueryParameter =  function(){
        };

        return QueryField;
}]);