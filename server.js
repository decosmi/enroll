"use strict";
var express=require("express");
var app=express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var databaseManager = require("./database-manager.js");


app.use(express.static("public"));
app.listen(3000,function(){
  console.log("listening on port",3000);
});

app.route("/guardian")
	.post (function(request, response) {
		databaseManager.saveGuardian(request.body.first_name, request.body.last_name,request.body.id_token, request.body.home_address, request.body.home_city,
		request.body.home_state,request.body.home_zip,request.body.email, request.body.cell_phone, request.body.home_phone, 
		request.body.work_phone, request.body.work_name, function(result){
		return response.send(result);
		});
	})
	.get (function(request,response){
		databaseManager.readProfile(request.query.id_token, function(result){
		return response.send(result); 
		});
	});

app.route("/student")
	.post(function(request,response){
		databaseManager.saveStudent(request.body.first_name, request.body.middle_name, request.body.last_name, request.body.birthdate,
		request.body.gender, request.body.social_security, request.body.race_ethnicity,request.body.guardian_id, request.body.rel_to_student, databaseManager.saveStudentGuardian);
	});