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


            $scope.search = function (){
                ShareService.search($rootScope.searchRequest)
                    .then(function(response){
                        $scope.dataSource = [];
                        $scope.dataSource = response.data;
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
                        $scope.shareGridOptions.columnDefs =
                            $scope.myDefs;

                    });
            };

            $scope.searchControl = {
                columnDefs: $scope.myDefs
            };
            $scope.shareGridOptions = {
                data: 'dataSource',
                showGridFooter: true,
                columnDefs: $scope.myDefs,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.grid.registerRowsProcessor($scope.searchControl.multicolumnsFilter, 200);
                }
            };

            $scope.saveState = function(){
                CacheRequestService.save($rootScope.searchRequest)
            };

            $scope.filter = function () {
                $scope.gridApi.grid.refresh();
            };
        }]);
