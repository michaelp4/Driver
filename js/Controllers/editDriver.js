angular.module('whoseTurnToDrive').controller('editDriverController', ['$rootScope', '$scope','$location','backendOperationsService',
    function($rootScope, $scope, $location, backendOperationService){
        $scope.title = "עריכת נהג";
        $scope.currentDriver = _.mapValues($rootScope.selectedDriver, function(prop){return prop.toString()});
        $scope.save = function(){
            backendOperationService.updateDriver($scope.currentDriver).then(function(){
                $location.path("/viewDrivers");
            },function(data){
                console.error("error adding driver to the service", data);
            });
        };
        $scope.goBack = function(){
            history.back();
        };
    }
]);