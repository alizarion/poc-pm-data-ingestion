angular.module('share.ws.demo')
    .factory('CacheRequestService',['QueryField',function(QueryField) {
        var CACHED_REQUEST_KEY = 'share_ws_saved_request';

        function _save(searchRequest){
            localStorage.setItem(CACHED_REQUEST_KEY,angular.toJson(searchRequest));
        }

        function _load(){
            var searchRequest =
                angular.fromJson(localStorage.getItem(CACHED_REQUEST_KEY));

            if(!searchRequest) {
                searchRequest = {};
                searchRequest.query = [];
                searchRequest.query.push(new QueryField('SenderKey','=='));
                searchRequest.query.push(new QueryField('SenderType','=='));
                searchRequest.query.push(new QueryField('ActivityKey','=='));
                searchRequest.query.push(new QueryField('ActivityStage','=='));
                searchRequest.query.push(new QueryField('EntityKey','=='));
                searchRequest.query.push(new QueryField('EntityType','=='));
                searchRequest.query.push(new QueryField('ProcessKey','=='));
                searchRequest.query.push(new QueryField('TaskStatus','=='));
                searchRequest.query.push(new QueryField('TaskKey','=='));
                searchRequest.query.push(new QueryField('SenderType','=='));
                searchRequest.query.push(new QueryField('ProcessKey','=='));
                searchRequest.query.push(new QueryField('CreationDate','=ge='));
                searchRequest.query.push(new QueryField('CreationDate','=le='));
                searchRequest.query.push(new QueryField('DueDate','=ge='));
                searchRequest.query.push(new QueryField('DueDate','=le='));

            }

            searchRequest.isComplete =  function(){
                return searchRequest.serviceUrl  ;
            };
            return searchRequest;
        }

        return {
            load : _load,
            save : _save
        }
    }]);