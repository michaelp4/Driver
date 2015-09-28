angular.module('whoseTurnToDrive').controller('driversHistoryController', ['$scope','backendOperationsService',
    function($scope, backendOperationService){
        $scope.title = "היסטוריית יציאות";
        $scope.driversHistoryColumns = [{
            title:'נהגים',
            field:'drivers'
        },{
            title:'נוסעים',
            field:'passengers'
        },{
            title:'זמן',
            field:'dateTime'
        },{
            title:'לאן יצאנו?',
            field:'destination'
        }];
        backendOperationService.getAllCurrentDrivers(true).then(function(driversHistory){
            backendOperationService.getAllDrivers().then(function(allDrivers){
                //outings = יציאות
                var outings = _.groupBy(driversHistory.data, 'DateTime');
                var getDriverNameByDriverId = function(currentDriver){
                    return _.filter(allDrivers.data, {'Id':currentDriver.DriverId})[0].Name;
                };
                var getDataSourceFromOutingsData = function(outing){
                    var driversAndPassengers = _.groupBy(outing, 'IsDriving');
                    var drivers = _.map(driversAndPassengers[true], getDriverNameByDriverId);
                    var passengers = _.map(driversAndPassengers[false], getDriverNameByDriverId);
                    return {drivers:drivers.join(' , '),
                    passengers:passengers.join(' , '),
                    dateTime: outing[0].DateTime.replace('T',' '),
                    destination: outing[0].Destination
                    }
                };
                $scope.driversHistory = _.map(outings, getDataSourceFromOutingsData)
            });
        });
        $scope.goBack = function(){
            history.back();
        };
    }
]);