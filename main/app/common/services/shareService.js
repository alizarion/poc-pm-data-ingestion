angular.module('share.ws.demo')
    .factory('ShareService',['$http','CacheRequestService','$rootScope',
        function($http,CacheRequestService,$rootScope) {

        function _getQueryFromQueryFields(fields){
            var query = [];
            fields.forEach(function(field){
                if(field.value){
                    var isDate = Date.parse(field.value);
                    console.log(isDate);
                    if(isDate){
                        query = query  + ((query.length == 0 )? field.key + field.operator + field.value  : ';'+field.key + field.operator + JSON.stringify(field.value).replace('"',''));

                    } else {
                        query = query  + ((query.length == 0 )? field.key + field.operator + field.value  : ';'+field.key + field.operator + field.value);
                    }
                }
            });
            return query;
        }

        function _search(searchRequest){
            CacheRequestService.save(searchRequest);
            var queryField = _getQueryFromQueryFields(searchRequest.query);
            console.log(queryField);
            $rootScope.lastRequestURL = searchRequest.serviceUrl +
                '?skip=50'+
                '&take=50'+ (queryField.length > 0 ? '&filter='+queryField :'');

            return  $http({
                method:'GET',
                url : searchRequest.serviceUrl,
                params:{
                    skip: 50,
                    take: 50,
                    filter : queryField
                }
            })
        }

        return {
            search : _search
        }
    }]);