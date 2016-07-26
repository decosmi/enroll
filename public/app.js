"use strict";

var app = angular.module('myApp', []);

// app.controller('loginCtrl', function($scope, $http, sendData){  

// //     $scope.login = function(){   
// //         $http({
// //             method:'POST',
// //             url:'/guardian',
// //             data: {first_name: $scope.guardianFirstName,
// //                 last_name: $scope.guardianLastName,
// //                 home_address:$scope.guardianAddress,
// //                 home_city: $scope.guardianCity,
// //                 home_state:$scope.guardianState,
// //                 home_zip: $scope.guardianZip,
// //                 email:$scope.guardianEmail,
// //                 cell_phone:$scope.guardianCell,
// //                 home_phone:$scope.guardianHome,
// //                 work_phone:$scope.guardianWorkPhone,
// //                 work_name:$scope.guardianWorkName
// //             } 
// //         }).then(function successCallback(data){
// //             sendData.guardianID= data.data.rows[0].id;
// //             console.log(sendData.guardianID)
// //             }, 
// //             function errorCallback(data){
// //             console.log("It didn't work.");
// //         });  
// //     }
// // });

app.controller('registerCtrl', function($scope, $http, sendData){  
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
            sendData.guardianID= data.data.rows[0].id;
            sendData.guardianName=$scope.guardianFirstName;
            console.log(sendData.guardianID);
            console.log(sendData.guardianName);
            }, 
            function errorCallback(data){
            console.log("It didn't work.");
        });  
    }
});

app.controller('studentCtrl', function ($scope,$http, sendData){
    $scope.students=[];

    $scope.addStudent= function(){
        $http({
            method:'POST',
            url:'/student',
            data: {first_name:$scope.studentFirst,
             middle_name:$scope.studentMiddle,
             last_name:$scope.studentLast,
            birthdate: $scope.selectedMonth+$scope.selectedDay+$scope.selectedYear, 
            gender:$scope.gender,
            social_security:$scope.ssn, 
            race_ethnicity: $scope.race,
            guardian_id: sendData.guardianID,
            rel_to_student: $scope.rel
            }
        }).then (function successCallback(data){
            console.log(data);
        }),
        function errorCallback(data){
            console.log("It didn't work");
        }
    } 

});

app.service('sendData',function(){
    this.guardianID=0;
    this.guardianName=0;
    this.studentID=30;
});