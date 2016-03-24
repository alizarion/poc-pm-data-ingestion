'use strict';

angular.module('share.ws.demo')
    .controller('MainController', [
        '$scope',
        '$translate',
        '$rootScope',
        'CacheRequestService',
        function ($scope,
                  $translate,
                  $rootScope,
                  CacheRequestService) {
            $rootScope.searchRequest = CacheRequestService.load();
            $scope.currentLanguage = 'fr_FR';
            $scope.changeLanguage = function (language) {
                $scope.currentLanguage = language;
                $translate.use(language);
            };

        }]);
