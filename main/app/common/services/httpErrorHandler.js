angular.module('share.ws.demo')
    .factory('HttpErrorHandler', ['$rootScope','$q',function($rootScope,$q) {
    return {
        // optional method
        'request': function(config) {
            // do something on success
            $rootScope.$error = null;
            return config;
        },

        // optional method
        'requestError': function(rejection) {
            // do something on error
            return $q.reject(rejection);
        },

        // optional method
        'response': function(response) {
            // do something on success

            return response;
        },

        // optional method
        'responseError': function(rejection) {
            // do something on error
            rejection.data.status = rejection.status;
            $rootScope.$error = rejection.data;

            return $q.reject(rejection);
        }
    };
}]);
