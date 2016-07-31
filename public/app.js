"use strict";

var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope,$rootScope, $http, sendData,controlDisplay){ 
    $scope.showEnrollForm=function(){
        return controlDisplay.showEnrollForm;
    }

    $scope.toggleWelcomeTrue= function(){
        return controlDisplay.toggleWelcomeTrue();
    }

    $scope.showWelcome=function(){
        return controlDisplay.showWelcome;
    }

    $scope.toggleEnrollFalse= function(callback){
        callback();
        return controlDisplay.showEnrollForm=false;

    }


 $scope.displayUserData = function(){
        //guardian data
        $scope.guardianFirstName = sendData.guardianFirstName;
        $scope.guardianCell = sendData.guardianCell;
        $scope.guardianPreferredEmail = sendData.guardianPreferredEmail;
        $scope.guardianHomeAddress = sendData.guardianHomeAddress;
        $scope.guardianHomeCity = sendData.guardianHomeCity;
        $scope.guardianHomePhone= sendData.guardianHomePhone;
        $scope.guardianHomeState= sendData.guardianHomeState;
        $scope.guardianHomeZip= sendData.guardianHomeZip;
        $scope.guardianLastName= sendData.guardianLastName;
        $scope.guardianWorkEmail= sendData.guardianWorkEmail;
        $scope.guardianWorkName= sendData.guardianWorkName;
        $scope.guardianWorkPhone= sendData.guardianWorkPhone;
        $scope.guardianRel=sendData.guardian_rel;

        //student data
        $scope.studentBDay= sendData.studentBDay;
        $scope.studentFirst=sendData.studentFirst;
        $scope.studentLast= sendData.studentLast;
        $scope.studentMid= sendData.studentMid;
        $scope.studentRace= sendData.studentRace;
        $scope.studentSSN= sendData.studentSSN;
        $scope.studentGender= sendData.studentGender;
    }

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
                            [{text:'Name (Last First Middle)', style: 'tableHeader1'}, {text:'Home Address', style:'tableHeader1'}, {text:'Telephone Number', style:'tableHeader1'},{text:'Birthday', style:'tableHeader1'}],
                            [sendData.studentLast+' '+sendData.studentFirst+' '+sendData.studentMid,sendData.guardianHomeAddress+' '+sendData.guardianHomeZip , sendData.guardianCell, sendData.studentBDay]
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
                            [sendData.guardian_rel, sendData.guardianFirstName+' '+sendData.guardianLastName, sendData.guardianHomeAddress+' '+sendData.guardianHomeZip, sendData.guardianCell,sendData.guardianWorkName+' '+sendData.guardianWorkPhone]
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

app.controller('loginCtrl', function($scope,$rootScope, $http, sendData,controlDisplay){  
    $scope.toggleUpdateTrue= function(){
    return controlDisplay.showUpdate=true;
    }

    $scope.callback=function(){
        return ;
    }

    $scope.toggleAddStudentTrue= function(){
        return controlDisplay.toggleAddStudentTrue();

    }

    $scope.toggleWelcomeFalse= function(){
    return controlDisplay.toggleWelcomeFalse;
    }


    $scope.showLogin=function(){
        return controlDisplay.showLogin;
    }    

    $scope.showWelcome=function(){
        return controlDisplay.showWelcome;
    }

    $scope.toggleEnrollTrue= function (){
        return controlDisplay.toggleEnrollTrue();
    }

    $scope.hideWelcome=function(callback){
    callback();
    return controlDisplay.showWelcome=false;
    }

    $rootScope.greeting="";
    $scope.kids=[];
    $scope.kidID=[];

    $scope.onSignIn= function (googleUser) {
      sendData.id_token=googleUser.getBasicProfile().Ka;
      sendData.guardianEmail=googleUser.getBasicProfile().hg;

        $http({
            method:'GET',
            url:'/guardian',
            params: {id_token:sendData.id_token} 
        }).then(function successCallback(data){
            sendData.guardianCell=data.data.rows[0].cell_phone;
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
            sendData.guardianWorkPhone=data.data.rows[0].work_phone;
            controlDisplay.showUpdate=true;
            controlDisplay.showLogin=false;
        }, 
        function errorCallback(data){
            console.log("Not in the system");
            console.log(data);
        }); 
    };

    window.onSignIn=$scope.onSignIn;

    $scope.findKids= function(guardian_id){
        $http({
            method:'GET',
            url:'/student',
            params:{guardian_id:sendData.guardianID}
        }) 
        .then(function successCallback(data){
            for (var i=0; i<data.data.rows.length;i++) {
                $scope.kids.push(data.data.rows[i].student_first);
                $scope.kidID.push(data.data.rows[i].student_id);
            }      
            }, 
            function errorCallback(data){console.log("Didn't work.")
        });

    }

    $scope.chooseStudent= function(selectedStudent){
        var studentIndex= $scope.kids.indexOf($scope.selectedStudent);
        var selectedStudentID= $scope.kidID[studentIndex];
        sendData.studentID= $scope.kidID[studentIndex];
        $http({
            method:'GET',
            url:'/studentguardian',
            params:{id:selectedStudentID}
        }) 
        .then(function successCallback(data){
                sendData.studentID=data.data.rows[0].id;
                sendData.studentBDay=data.data.rows[0].birthdate;
                sendData.studentFirst=data.data.rows[0].first_name;
                sendData.studentLast=data.data.rows[0].last_name;
                sendData.studentMid=data.data.rows[0].middle_name,
                sendData.studentRace=data.data.rows[0].race_ethnicity;
                sendData.studentSSN=data.data.rows[0].social_security;
                sendData.studentGender=data.data.rows[0].gender;
            }, 
            function errorCallback(data){console.log("Didn't work.")
        });
    }
});

app.controller('registerCtrl', function($scope, $http, sendData,controlDisplay){  
    $scope.toggleWelcomeTrue= function (){
        return controlDisplay.toggleWelcomeTrue();
    }

    $scope.showUpdate=function(){
        return controlDisplay.showUpdate;
    }

    $scope.hideUpdate=function(callback){
        callback();
        return controlDisplay.showUpdate=false;
    }

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

app.controller('studentCtrl', function ($scope,$http, sendData,controlDisplay){
    $scope.toggleWelcomeTrue= function (){
        return controlDisplay.toggleWelcomeTrue();
    }


    $scope.toggleWelcomeFalse= function(){
        return controlDisplay.toggleWelcomeFalse();
    }


    $scope.showAddStudent=function(){
        return controlDisplay.showAddStudent;
    }
    $scope.toggleAddStudentTrue=function(callback){
        return controlDisplay.toggleAddStudentTrue();
        callback();
    }

    $scope.toggleAddStudentFalse= function(callback){
        controlDisplay.showWelcome=true;
        return controlDisplay.toggleAddStudentFalse();
        callback();
    }



    $scope.addStudent= function(){
        $http({
            method:'POST',
            url:'/student',
            data: {first_name:$scope.studentFirst,
             middle_name:$scope.studentMiddle,
             last_name:$scope.studentLast,
            birthdate: $scope.selectedMonth+' '+$scope.selectedDay+' ,'+$scope.selectedYear, 
            gender:$scope.gender,
            social_security:$scope.ssn, 
            race_ethnicity: $scope.race,
            guardian_id: sendData.guardianID,
            rel_to_student: $scope.rel
            }
        }).then (function successCallback(data){
                sendData.studentBDay=data.config.data.birthdate;
                sendData.studentFirst=data.config.data.first_name;
                sendData.studentID=data.config.data.id;
                sendData.studentLast=data.config.data.last_name;
                sendData.studentMid=data.config.data.middle_name;
                sendData.studentRace=data.config.data.race_ethnicity;
                sendData.guardian_rel=data.config.data.rel_to_student;
                sendData.studentSSN=data.config.data.social_security;
                sendData.studentGender=data.config.data.gender;
                controlDisplay.showWelcome=true;
                controlDisplay.showAddStudent=false;
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
    this.guardianFirstName=0;
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
    this.studentID=0;
    this.guardian_rel="mother";
    this.studentBDay=0;
    this.studentFirst=0;
    this.studentLast=0;
    this.studentMid=0,
    this.studentRace=0;
    this.studentSSN=0;
    this.studentGender=0;
});

app.service('controlDisplay',function(){
    this.showLogin=true;
    this.showUpdate=false;
    this.showAddStudent=false;
    this.showEnrollForm=false;
    this.showWelcome=false;

    this.toggleWelcomeTrue= function(){
        return this.showWelcome=true;
    }

    this.toggleWelcomeFalse= function(){
    return this.showWelcome=false;
    }

    this.toggleEnrollTrue= function(){
    return this.showEnrollForm=true;
    }

    this.toggleEnrollFalse= function(callback){
    return this.showEnrollForm=false;
    }


    this.toggleAddStudentTrue= function(){
    return this.showAddStudent=true;
    }

    this.toggleAddStudentFalse= function(){
    return this.showAddStudent=false;
    }

    this.toggleUpdateTrue= function(){
    return this.showUpdate=true;
    }
});