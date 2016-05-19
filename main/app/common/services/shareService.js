angular.module('share.ws.demo')
    .factory('ShareService',['$http','CacheRequestService','$rootScope','urlBuilder',
        function($http,CacheRequestService,$rootScope, urlBuilder) {

        function _getQueryFromQueryFields(fields){
            var query = [];
            fields.forEach(function(field){
                if(field.value){
                    var value;
                    if (field.key == 'TaskPriority')
                    {
                        value = field.value;
                    }
                    else if(Date.parse(field.value)){
                        value = "'" + JSON.stringify(field.value).replace(/"/gi, '') + "' ";
                    } else {
                        value = "'" + field.value + "'";
                    }

                    query = query  + ((query.length == 0 )
                            ? field.key + ' ' + field.operator + ' ' + value + ' '
                            : ' and '+ field.key + ' ' + field.operator + ' ' + value);
                }
            });

            return query;
        }

        function getAssignation(assigned)
        {
            var query = '';
            if (assigned.length > 0)
            {
                // /any(f:f/FirstName eq 'Scott')
                query = ' PotentialOwners/any(f:'
                for (i = 0; i < assigned.length; i++) {
                    query = query + "f/Key eq '" + assigned[i].text + "'";
                    if (i < assigned.length -1)
                    {
                        query = query + ' or '
                    }
                }
                query = query + ')'
            }

            return query
        }

        function _search(searchRequest){
            CacheRequestService.save(searchRequest);

            var queryField = _getQueryFromQueryFields(searchRequest.query);
            console.log(queryField);

            var assignedquery = getAssignation(searchRequest.assignations);
            if (assignedquery.length > 0)
            {
                queryField = queryField + ((queryField.length == 0 )
                    ? assignedquery
                    : ' and ' + assignedquery);
            }
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
                    /* $count: true, pas supporté par la librairie */
                    $top: searchRequest.paginationOptions.pageSize,
                    $skip : skip,
                    /*$orderby : searchRequest.paginationOptions.sort.column,*/
                    $filter : queryField,
                    $expand : 'PotentialOwners'
                }

            });
            promise.catch(function(e) {
                $rootScope.lastRequestURL = 'failed';
                throw e;
            });

            promise.success(function(data, status, headers, config) {
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