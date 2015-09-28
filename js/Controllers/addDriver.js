angular.module('whoseTurnToDrive').controller('addDriverController', ['$scope','$location', 'backendOperationsService',
    function($scope,$location,  backendOperationsService){
        $scope.title = "הוספת נהג חדש";
        $scope.save = function(){
           var driverToSendToServer =  _.mapValues($scope.currentDriver, function(prop){
                if(prop == "true" || prop == "false"){
                    return JSON.parse(prop);
                }else{
                    return prop;
                }
            });
            backendOperationsService.addDriver(driverToSendToServer).then(function(){
                history.back();
            },function(data){
                console.error("error adding driver to the service", data);
            });
        };
        $scope.goBack = function(){
            history.back();
        };
    }]);