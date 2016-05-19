'use strict';
angular.module('share.ws.demo', [
    'itesoft',
    'ngRoute',
    'ngSanitize',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.timepicker',
    'pascalprecht.translate',
    'ui.bootstrap.dropdown',
    'ngTagsInput',
    'ui.grid.expandable'
    ])
    .config(['$datepickerProvider',function($datepickerProvider) {
//        angular.extend($datepickerProvider.defaults, {
//            dateFormat: 'yyyy-mm-ddThh:ii:ssZ',
//            startWeek: 1
//        });
        angular.extend($datepickerProvider.defaults, {
                dateFormat: 'dd/MM/yyyy',
                modelDateFormat: "yyyy-MM-ddT00:00:00",
                dateType: "string"
            });
    }])
    .config(['$translateProvider',
        '$translatePartialLoaderProvider',
        '$httpProvider',
        function ($translateProvider,
                  $translatePartialLoaderProvider,
                  $httpProvider) {
        // Declare languages mapping

        $translateProvider.registerAvailableLanguageKeys(['en', 'fr', 'de'], {
            'en_US': 'en',
            'en_GB': 'en',
            'fr_FR': 'fr',
            'fr-CA': 'fr',
            'de-DE': 'de'
        }).determinePreferredLanguage();

        // Use partial loader
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'assets/locale/{lang}/{part}-{lang}.json'
        });
        $httpProvider.interceptors.push('HttpErrorHandler');
        $translateProvider.useSanitizeValueStrategy();
    }])
    .run(['$rootScope', '$route', function ($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.pageTitle = $route.current.title;
        });
    }])
    .factory('urlBuilder', ['$httpParamSerializer',
        function($httpParamSerializer) {
            function buildUrl(url, params) {
                var serializedParams = $httpParamSerializer(params);

                if (serializedParams.length > 0) {
                    url += ((url.indexOf('?') === -1) ? '?' : '&') + serializedParams;
                }

                return url;
            }

            return buildUrl;
        }]);

