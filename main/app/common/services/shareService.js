angular.module('share.ws.demo')
    .factory('ShareService',['$http','CacheRequestService','$rootScope','urlBuilder',
        function($http,CacheRequestService,$rootScope, urlBuilder) {

        function _getQueryFromQueryFields(fields){
            var query = [];
            fields.forEach(function(field){
                if(field.value){
                    var isDate = Date.parse(field.value);
                    console.log(isDate);
                    if(isDate){
                        query = query  + ((query.length == 0 )? field.key + ' '+ field.operator + ' '+ field.value  : ' and '+ field.key + ' '+ field.operator + ' '+ JSON.stringify(field.value).replace('"',''));

                    } else {
                        query = query  + ((query.length == 0 )? field.key + ' '+ field.operator + ' '+ field.value  : ' and '+ field.key + ' '+ field.operator + ' '+ field.value);
                    }
                }
            });
            return query;
        }

        function _search(searchRequest){
            CacheRequestService.save(searchRequest);
            var queryField = _getQueryFromQueryFields(searchRequest.query);
            console.log(queryField);
            /*
            $rootScope.lastRequestURL = searchRequest.serviceUrl +
                '?$count=true' +
                (queryField.length > 0 ? '&filter='+queryField :'');
            */
            var skip = (searchRequest.paginationOptions.pageNumber - 1 ) * searchRequest.paginationOptions.pageSize
            /*return urlBuilder(
                searchRequest.serviceUrl,
                {
                    $count: true,
                    $top: searchRequest.paginationOptions.pageSize,
                    $skip : skip,
                    filter : queryField
                });
            */
            var promise = $http({
                method:'GET',
                url : searchRequest.serviceUrl,
                params:{
                    $count: true,
                    $top: searchRequest.paginationOptions.pageSize,
                    $skip : skip,
                    /*$orderby : searchRequest.paginationOptions.sort.column,*/
                    filter : queryField
                }

            })
            .success(function(data, status, headers, config) {
                var query = [];
                Object.keys(config.params || {}).forEach(function (key) {
                  var val = config.params[key];
                  query.push([key, val].join('=')); // maybe url encode
                });

                var queryStr = query.join('&');

                $rootScope.lastRequestURL = config.url + '?' + queryStr;
            });

            return promise;
        }

        return {
            search : _search
        }
    }]);