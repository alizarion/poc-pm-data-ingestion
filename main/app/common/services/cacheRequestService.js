angular.module('share.ws.demo')
    .factory('CacheRequestService',['QueryField',function(QueryField) {
        var CACHED_REQUEST_KEY = 'share_ws_saved_request';

        function _save(searchRequest){
            localStorage.setItem(CACHED_REQUEST_KEY,angular.toJson(searchRequest));
        }

        function _load(){
            var backup = angular.fromJson(localStorage.getItem(CACHED_REQUEST_KEY));
            var searchRequest = {
                query : [],
                paginationOptions : backup.paginationOptions,
                serviceUrl : backup.serviceUrl
                };
            backup.query.forEach(function(element, index, array)
            {
                searchRequest.query.push(new QueryField(element.key,element.operator, element.value));
            });

            if(!searchRequest) {
                searchRequest = {};
                searchRequest.paginationOptions = {
                    pageNumber: 1,
                    pageSize: 250,
                    sort: {}
                  };
                searchRequest.query = [];
                searchRequest.query.push(new QueryField('SenderKey','eq'));
                searchRequest.query.push(new QueryField('SenderType','eq'));
                searchRequest.query.push(new QueryField('ActivityKey','eq'));
                searchRequest.query.push(new QueryField('ActivityStage','eq'));
                searchRequest.query.push(new QueryField('EntityKey','eq'));
                searchRequest.query.push(new QueryField('EntityType','eq'));
                searchRequest.query.push(new QueryField('ProcessKey','eq'));
                searchRequest.query.push(new QueryField('TaskStatus','eq'));
                searchRequest.query.push(new QueryField('TaskKey','eq'));
                searchRequest.query.push(new QueryField('SenderType','eq'));
                searchRequest.query.push(new QueryField('ProcessKey','eq'));
                searchRequest.query.push(new QueryField('CreationDate','ge'));
                searchRequest.query.push(new QueryField('CreationDate','le'));
                searchRequest.query.push(new QueryField('DueDate','ge'));
                searchRequest.query.push(new QueryField('DueDate','le'));

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
