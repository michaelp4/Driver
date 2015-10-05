angular.module('whoseTurnToDrive').controller('manageDriversController', ['$rootScope', '$scope', '$location', 'backendOperationsService',
    function($rootScope, $scope,$location, backendOperationsService){
        $scope.title = "נהל נהגים";
        $scope.driversColumns = [
            {
                title:"מזהה",
                field:"Id",
                width:6
            },{
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
                title:"מחק נהג",
                template: function (driver) {
                    return "<button class='btn btn-danger' ng-click='deleteDriver(" + driver.Id + ")'><span class='glyphicon glyphicon-remove'/></button>"
                },
                width:80
            },
            {
                title:"ערוך",
                template: function (driver) {
                    return "<button class='btn btn-default' ng-click='editDriver(" + driver.Id + ")'><span class='glyphicon glyphicon-pencil'/></button>"
                },
                width:80
            }
        ];
        function refreshAllDrivers(){
            backendOperationsService.getAllDrivers().then(function(allDrivers){
                $scope.allDrivers = new kendo.data.DataSource();
                _.each(allDrivers.data, function(driver){
                    $scope.allDrivers.add(driver);
                });
            });
        }
        refreshAllDrivers();
        $scope.editDriver = function(id){
            $rootScope.selectedDriver = _.filter($scope.allDrivers.data(),{Id:id})[0];
            $location.path("/editDriver");
        };
        $scope.goBack = function(){
            history.back();
        };
        $scope.deleteDriver = function(id){
            backendOperationsService.deleteDriver(id).then(function(){
                refreshAllDrivers();
            });
        }
    }]);