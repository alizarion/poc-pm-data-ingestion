'use strict';

angular.module('share.ws.demo')
    .controller('HomeController', [
        '$scope',
        'FetchDataService',
        'ShareService',
        'CacheRequestService',
        '$rootScope',
        function ($scope,
                  FetchDataService,
                  ShareService,
                  CacheRequestService,
                  $rootScope) {
            $scope.myDefs = [];
            $scope.dataSource = [];
            $scope.myDefs = [];
            $scope.loading = false;

            $scope.search = function (){
                $scope.loading = true;
                ShareService.search($rootScope.searchRequest)
                    .then(function(response){
                        $scope.dataSource = [];
                        $scope.dataSource = response.data.value;
                       // $scope.translations = FetchDataService.extractTraduction(response.data);

                        $scope.myDefs = [];
                        var document  = $scope.dataSource[0];
                        for(var name in document) {
                            $scope.myDefs.push(
                                {
                                    field:name
                                }
                            )
                        }
                        $scope.searchControl = {
                            columnDefs: $scope.myDefs
                        };
                        $scope.shareGridOptions.columnDefs = $scope.myDefs;
                        $scope.loading = false;
                    });
            };

            $scope.searchControl = {
                columnDefs: $scope.myDefs
            };
            $scope.shareGridOptions = {
                data: 'dataSource',
                showGridFooter: true,
                columnDefs: $scope.myDefs,
                useExternalPagination: true,
                useExternalSorting: true,
                paginationPageSizes : [10, 20, 50, 100, 250, 500],
                /*enableFiltering: true,
                showColumnFooter: true,
                odata: {
                    metadatatype: 'xml',
                    datatype: 'json',
                    expandable: 'subgrid',  //can be also 'link' or 'json'
                    entitySet: 'Messages',
                    dataurl: "http://localhost/Poc/Messages",
                    metadataurl: 'http://localhost/Poc/$metadata#Messages',
                    gencolumns: true
                },*/
                enablePaginationControls : true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.grid.registerRowsProcessor($scope.searchControl.multicolumnsFilter, 200);
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                        if (sortColumns.length == 0) {
                          $rootScope.searchRequest.paginationOptions.sort = {};
                        } else {
                          $rootScope.searchRequest.paginationOptions.sort.direction = sortColumns[0].sort.direction;
                          $rootScope.searchRequest.paginationOptions.sort.column = sortColumns[0].field;
                        }
                        $scope.search();
                      });

                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $rootScope.searchRequest.paginationOptions.pageNumber = newPage;
                        $rootScope.searchRequest.paginationOptions.pageSize = pageSize;
                        $scope.search();
                    });
                }
            };

            $scope.saveState = function(){
                CacheRequestService.save($rootScope.searchRequest)
            };

            $scope.filter = function () {
                $scope.gridApi.grid.refresh();
            };


        }]);
