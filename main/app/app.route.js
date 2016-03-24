'use strict';

angular.module('share.ws.demo').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/features/home/homeView.html',
                controller: 'HomeController',
                title: 'HOME.TITLE'

            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);