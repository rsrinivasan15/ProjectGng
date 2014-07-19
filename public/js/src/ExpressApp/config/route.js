angular.module('ExpressApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/login', {
                templateUrl: '/js/src/ExpressApp/templates/login.html',
                controller: 'LoginController'
            }).
            when('/home', {
                templateUrl: '/js/src/ExpressApp/templates/home.html',
                controller: 'HomeController'
            }).
            when('/user/:facebookId', {
                templateUrl: '/js/src/ExpressApp/templates/userPage.html',
                controller: 'UserPageController'
            })
    }]);