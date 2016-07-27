"use strict";

var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope,$rootScope, $http, sendData){ 
    $scope.createEnrollForm = function(){
        return {
            pageOrientation: 'landscape',
            content: [
                {text:'CHILD CARE ENROLLMENT',style:'header'},
                {text:'STATE OF WISCONSIN DEPARTMENT OF CHILDREN AND FAMILIES Division of Early Care and Education DCF-F (CFS-0062) (R. 02/2009)',
                    style:'smaller'},
                {text:"USE OF FORM: Use of this form is mandatory for Family Child Care Centers to comply with DCF 250.04(6)(a)1. Failure to comply may result in issuance of a noncompliance statement.This form may also be used by Group Child Care Centers and Day Camps to comply with DCF 251.04(6)(a)1. and DCF 252.41(4)(a)1. respectively. Personal information you provide maybe used for secondary purposes Privacy Law, s.15.04(1)(m), Wisconsin Statutes.",
                    style:'smaller'},
                {text:"INSTRUCTIONS: The parent / guardian shall fill out the form completely, sign it and submit it to the center prior to the child's first day of attendance. Information on this form shall be keptcurrent. When enrolling a child under two years of age, a completed Intake for Child Under 2 Years form must also be on file prior to the child's first day of attendance.",
                    style:'smaller'},
                {text:'Child Information', style:'subheader'},
                {
                    table: { 
                        headerRows: 1,
                        widths: [200,300,100,100],
                        body:[
                            [{text:'Name (Last First Middle)', style: 'tableHeader1'}, {text:'Home Address', style:'tableHeader1'}, {text:'Telephone Number', style:'tableHeader1'},{text:'Birthday (mm/dd/yyyy)', style:'tableHeader1'}],
                            ['placeholder', 'placeholder', 'placeholder', 'placeholder']
                        ]
                    },

                },           
                {text:'Parent or Guardian', style:'subheader'},
                {
                    table: { 
                        headerRows: 1,
                        widths: [100,100,200,100,200],
                        body:[
                            [{text:'Relationship to the Child', style: 'tableHeader1'},{text:'Name', style: 'tableHeader1'}, {text:'Home Address', style:'tableHeader1'}, {text:'Home/Cell Number', style:'tableHeader1'},{text:'Place of Employment-Name & Phone', style:'tableHeader1'}],
                            ['placeholder', sendData.guardianFirstName, 'placeholder', 'placeholder','placeholder']
                        ]
                    }

                },       
            ],

            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center', 
                },

                subheader: {
                    fontSize: 14,
                    alignment: 'left', 
                    color:'steelblue',
                    margin: 5, 
                },        
                smaller: {
                    fontSize: 6,
                },

                tableHeader1: {
                    fontSize: 12,
                    bold: true,
                    alignment:'left',
                    color:'lightslategray',
                    margin:5,
                }
            }
        };
    }

   // open the PDF in a new window
     $scope.openPDF= function(){
        pdfMake.createPdf($scope.createEnrollForm()).open();
    }

 // print the PDF (temporarily Chrome-only)
    $scope.printPDF=function(){
        pdfMake.createPdf($scope.createEnrollForm()).print();
    }

 // download the PDF (temporarily Chrome-only)

     $scope.downloadPDF= function(){
        pdfMake.createPdf($scope.createEnrollForm()).download('optionalName.pdf');
    }
});

//This is the end of the formCtrl.

app.controller('loginCtrl', function($scope,$rootScope, $http, sendData){  
    $rootScope.greeting="";

    $scope.onSignIn= function (googleUser) {
      sendData.id_token=googleUser.getBasicProfile().Ka;
      sendData.guardianEmail=googleUser.getBasicProfile().hg;
      //$rootScope.greeting=googleUser.getBasicProfile().Za;
      //$scope.$apply();
        $http({
            method:'GET',
            url:'/guardian',
            params: {id_token:sendData.id_token} 
        }).then(function successCallback(data){
                sendData.guardianPreferredEmail=data.data.rows[0].email;
                sendData.guardianFirstName= data.data.rows[0].first_name;
                sendData.guardianHomeAddress= data.data.rows[0].home_address;
                sendData.guardianHomeCity=data.data.rows[0].home_city;
                sendData.guardianHomePhone=data.data.rows[0].home_phone;
                sendData.guardianHomeState=data.data.rows[0].home_state;
                sendData.guardianHomeZip=data.data.rows[0].home_zip;
                sendData.guardianID=data.data.rows[0].id;
                sendData.guardianLastName=data.data.rows[0].last_name;
                sendData.guardianWorkEmail=data.data.rows[0].work_email;
                sendData.guardianWorkName= data.data.rows[0].work_name;
                sendData.guardianWorkPhone=data.data.rows[0].work_phone
        }, 
        function errorCallback(data){
            console.log("Not in the system");
            console.log(data);
        }); 
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
    //Guardian Information 
    this.guardianID=0;
    this.id_token=0;
    this.guardianFirstName='what the whaaa';
    this.guardianLastName=0;
    this.guardianHomeAddress=0;
    this.guardianHomeCity=0;
    this.guardianHomePhone=0;
    this.guardianHomeState=0;
    this.guardianHomeZip=0;
    this.guardianPreferredEmail=0;
    this.guardianWorkEmail=0;
    this.guardianWorkName=0;
    this.guardianWorkPhone=0;

    //Student Information 
    this.studentID=30;

});