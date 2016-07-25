"use strict";

var app = angular.module('myApp', []);
app.controller('registerCtrl', function($scope, $http){  
    $scope.register = function(){   
        $http({
            method:'POST',
            url:'/guardian',
            data: {first_name: $scope.guardianFirstName,
                last_name: $scope.guardianLastName,
                home_address:$scope.guardianAddress,
                home_city: $scope.guardianCity,
                home_state:$scope.guardianState,
                home_zip: $scope.guardianZip,
                email:$scope.guardianEmail,
                cell_phone:$scope.guardianCell,
                home_phone:$scope.guardianHome,
                work_phone:$scope.guardianWorkPhone,
                work_name:$scope.guardianWorkName
            } 
        }).then(function successCallback(data){
            console.log(data.data);
        }, 
        function errorCallback(data){
            console.log("It didn't work.");
        });  
    }
});