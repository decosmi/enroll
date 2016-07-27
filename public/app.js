"use strict";

var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope,$rootScope, $http, sendData){  
  $scope.docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  console.log($scope.docDefinition);
   // open the PDF in a new window
     $scope.openPDF= function(){
        pdfMake.createPdf($scope.docDefinition).open();
    }

 // print the PDF (temporarily Chrome-only)
    $scope.printPDF=function(){
        pdfMake.createPdf($scope.docDefinition).print();
    }

 // download the PDF (temporarily Chrome-only)

     $scope.downloadPDF= function(){
        pdfMake.createPdf($scope.docDefinition).download('optionalName.pdf');
    }
});


app.controller('loginCtrl', function($scope,$rootScope, $http, sendData){  
    $rootScope.greeting="";
    $scope.onSignIn= function (googleUser) {
              sendData.id_token=googleUser.getBasicProfile().Ka;
              $rootScope.greeting=googleUser.getBasicProfile().Za;
              $scope.$apply();
            };

    window.onSignIn=$scope.onSignIn;
});

app.controller('registerCtrl', function($scope, $http, sendData){  
    $scope.register = function(){   
        $http({
            method:'POST',
            url:'/guardian',
            data: {first_name: $scope.guardianFirstName,
                last_name: $scope.guardianLastName,
                id_token: sendData.id_token,
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
    this.id_token;
});