angular.module("whoseTurnToDrive", ["ngRoute","kendo.directives","angucomplete"]).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/addDriver', {
            templateUrl: 'views/addOrEditDriver.html',
            controller: 'addDriverController'
        })
        .when('/manageDrivers', {
            templateUrl: 'views/manageDrivers.html',
            controller: 'manageDriversController'
        })
        .when('/editDriver', {
            templateUrl: 'views/addOrEditDriver.html',
            controller: 'editDriverController'
        })
        .when('/driversHistory', {
            templateUrl: 'views/driversHistory.html',
            controller: 'driversHistoryController'
        })
        .when('/viewDrivers', {
            templateUrl: 'views/viewDriver.html',
            controller: 'viewDriversController'
        }).otherwise({
            redirectTo: '/viewDrivers'
        });
}]);