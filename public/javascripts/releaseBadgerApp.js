
var app = angular.module('releaseBadgerApp', ['ngRoute']);

// setup routing
app.config(function($routeProvider)
{
    $routeProvider
        .when('./', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })

        .when('/login', {
            templateUrl: 'login.html',
            controller: 'authController'
        })

        .when('/register', {
            templateUrl: 'login.html',
            controller: 'authController'
        });
});

// setup controllers
app.controller('mainController', function($scope){
    $scope.steps = [];
    $scope.newStep = {
        number: '',
        process: '',
        done: '',
        time_completed: ''
    };
});
