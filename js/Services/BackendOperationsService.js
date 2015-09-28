angular.module('whoseTurnToDrive').service("backendOperationsService",['$http', function($http){
    var serviceUrl = 'http://localhost:1235/api/';
    return {
        getAllDrivers:function(){
            return $http({
                method: 'GET',
                url: serviceUrl+ 'drivers',
                contentTye: "application/x-www-form-urlencoded"
            });
        },
        getAllCurrentDrivers: function(isExpired){
            if(isExpired == undefined){
                isExpired = false;
            }
            return $http({
                method: 'GET',
                url: serviceUrl+ 'currentDrivers?isExpired=' + isExpired,
                contentTye: "application/x-www-form-urlencoded"
            });
        },
        changeCurrentDriver: function(currentDriverId){
            return $http({
                method: 'PUT',
                url: serviceUrl + 'currentDrivers?driverId=' + currentDriverId
            });
        },
        getDriverById:function(driverId){
            return $http.get(serviceUrl+ 'drivers?id=' + driverId);
        },
        addDriverToCurrent: function(addedDriver){
            return $http.post(serviceUrl+ 'currentDrivers', $.param(addedDriver),
                {
                    headers:{
                        'Content-Type': "application/x-www-form-urlencoded"
                    }
                });
        },
        removeDriverFromCurrent: function(driverId){
            return $http.delete(serviceUrl+ 'currentDrivers?driverId='+ driverId);
        },
        addDriver: function(addedDriver){
            return $http({
                method:'POST',
                url:serviceUrl+ 'drivers',
                data: $.param(addedDriver),
                headers:{
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            });
        },
        updateDriver: function(newDriver){
            return $http({
                method:'PUT',
                url:serviceUrl+ 'drivers?id=' + newDriver.Id,
                data: newDriver
            });
        },
        refreshCurrentDrivers: function(destination){
            return $http({
                method:'DELETE',
                url:serviceUrl+ 'currentDrivers?destination='+ destination
            });
        },
        findDriver: function(){
            return $http({
                method:'GET',
                url:serviceUrl+ 'currentDrivers?fuck=fuck'
            });
        },
        deleteDriver: function(id){
            return $http({
                method:'DELETE',
                url:serviceUrl+ 'drivers?id=' + id
            });
        }
    };
}]);