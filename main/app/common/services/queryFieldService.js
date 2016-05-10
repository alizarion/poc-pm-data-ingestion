angular.module('share.ws.demo')
    .factory('QueryField',[function($scope){

      var oDataOperators = {};
      oDataOperators['='] = 'eq';
      oDataOperators['!='] = 'ne';
      oDataOperators['<'] = 'lt';
      oDataOperators['<='] = 'le';
      oDataOperators['>'] = 'gt';
      oDataOperators['>='] = 'ge';

        var QueryField =  function(key, operator, value){
            this.key =  key;
            this.operator = operator;
            this.value = value;
        };

        QueryField.prototype.getQueryParameter =  function(){
        };

        QueryField.prototype.availableOperators = oDataOperators;

        return QueryField;
}]);
