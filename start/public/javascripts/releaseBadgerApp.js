
var app = angular.module('releaseBadgerApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.release_number = '2.1.2';

    $rootScope.signout = function() {
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    };

});

// handler for auth responses
app.controller('authController', function($scope, $http, $rootScope, $location) {
    $scope.user = { username: '', password: ''};
    $scope.error_message = '';

    $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            } else {
                $scope.error_message = data.message;
            }
        });
    };

    $scope.register = function() {
        alert('test');
        $http.post('/auth/signup', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            } else {
                $scope.error_message = data.message;
            }
        });
    };

});

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
            templateUrl: 'register.html',
            controller: 'authController'
        });
});

app.factory('stepService', function($resource) {
    alert('test');
    return $resource('/api/steps/:id');
});


// setup controllers
app.controller('mainController', function($scope, stepService){
    alert('test');
    $scope.steps = stepService.query();
    $scope.newStep = { number: '', process: '', done: '', time_completed: '' };

    // initialise steps collection
    //stepService.getAll().success(function(data) {
    //    $scope.steps = data;
    //});

    // add a new step
    $scope.addStep = function() {
        $scope.newStep.created_at = Date.now();
        $scope.push($scope.newStep);
        $scope.newStep = { number: '', process: '', done: '', time_completed: '' };
    };

});
