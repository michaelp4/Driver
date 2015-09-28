angular.module('whoseTurnToDrive').controller('viewDriversController',['$rootScope', '$scope','$location', 'backendOperationsService',
    function($rootScope, $scope, $location, backendOperationsService){
        $scope.isAdmin = location.href.indexOf('admin') != -1;
        function refreshAllDrivers() {
            backendOperationsService.getAllDrivers().then(function (data) {
//            $scope.allDrivers = new kendo.data.DataSource({
//                data:data.data
//            });
//            $scope.allDrivers.read();
                $scope.allDrivers = data.data;
            }, function (data) {
                console.error(data);
                $scope.errorMessage = JSON.stringify(data);
            });
        }
        refreshAllDrivers();
        function refreshCurrentDrivers(){
            backendOperationsService.getAllCurrentDrivers().then(function(data){
                $scope.currentDrivers = new kendo.data.DataSource();
                data.data.forEach(function(currentDriver){
                    backendOperationsService.getDriverById(currentDriver.DriverId).then(function(driver){
                        driver.data.IsDriving = currentDriver.IsDriving;
                        $scope.currentDrivers.add(driver.data);
                    },function(data){
                        console.error("error while getting driver by id", data);
                        $scope.errorMessage1 = data;
                    });
                });
            },function(data){
                console.error("there was an error with reaching the backend", data);
                $scope.errorMessage1 = JSON.stringify(data);;
            });
        }
        refreshCurrentDrivers();
        $scope.driversColumns = [
            {
                title:"שם",
                field:"Name"
            },
            {
                title:"כמה פעמים היה נהג?",
                field:"TimesBeenADriver"
            },
            {
                title:"כמה פעמים היה נוסע?",
                field:"TimesBeenAPassenger"
            },
            {
                title:"האם נוהג היום?",
                field:"IsDriving",
                width:120
            },
            {
                title:"הסר",
                template: function (driver) {
                    return "<button class='btn btn-danger' ng-click='removeDriver(" + driver.Id + ")'><span class='glyphicon glyphicon-remove'/></button>"
                },
                width:80
            },
            {
                title:"ערוך",
                template: function (driver) {
                    return "<button class='btn btn-default' ng-click='editDriver(" + driver.Id + ")'><span class='glyphicon glyphicon-pencil'/></button>"
                },
                width:80
            },
            {
                title:"החלף נהג/נוסע",
                template: function (driver) {
                    return "<button class='btn btn-default' ng-click='switchToDriverOrPassenger(" + driver.Id +")'><span class='glyphicon glyphicon-user'/></button>"
                },
                width:120
            }
        ];
        $scope.addDriver = function(){
            $scope.isAdding = false;
            //checks if the added driver is already in the grid
            if(_.some($scope.currentDrivers.data(), function(driver){
                return driver.Id == $scope.addedDriver.Id
            })){
                $scope.addedDriver = "";
                return;
            }
            backendOperationsService.addDriverToCurrent($scope.addedDriver).then(function(){
                $scope.currentDrivers.add($scope.addedDriver);
                $scope.addedDriver = undefined;
                $scope.isAdding = false;
            }, function(){
                console.error("error while adding driver to current drivers");
            });
        };
        $scope.removeDriver = function(id){
            backendOperationsService.removeDriverFromCurrent(id).then(function(){
                $scope.currentDrivers.remove(_.filter($scope.currentDrivers.data(),{Id:id})[0]);
            }, function(){
                console.error("error while removing driver from current drivers");
            });
        };
        $scope.onGridSelected = function(selected){
            $scope.selectedDriver = selected;
            $rootScope.selectedDriver = selected;
        };
        $scope.switchToDriverOrPassenger = function(id){
            backendOperationsService.changeCurrentDriver(id).then(function(){

                $scope.selectedDriver.IsDriving = !$scope.selectedDriver.IsDriving;
            });
        };
        $scope.findDriver = function(){
            backendOperationsService.findDriver().then(function(){
                refreshCurrentDrivers();
            });
        };
        $scope.editDriver = function(id){
            $rootScope.selectedDriver = _.filter($scope.currentDrivers.data(),{Id:id})[0];
            $location.path("/editDriver");
        };
        $scope.letsGo = function(){
            backendOperationsService.refreshCurrentDrivers($scope.destination).then(function(){
                var clonedCurrentDrivers = _.clone($scope.currentDrivers.data());
                _.each(clonedCurrentDrivers, function(driver){
                    $scope.currentDrivers.remove(driver);
                });
                refreshAllDrivers();
            });
        };
    }]);