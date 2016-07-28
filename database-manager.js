"use strict";

var Pool = require("pg").Pool;
process.on("unhandledRejection", function(e) {
  console.log(e.message, e.stack);
});

module.exports = (function() {
  var config = {
    host: "localhost",
    user: "school",
    password: "password",
    database: "postgres"
  };

	var pool = new Pool(config);

	var saveGuardian= function(first_name,last_name,id_token,home_address,home_city,home_state,home_zip,email,
		cell_phone, home_phone,work_phone,work_name,callback){
		pool.query (
			"INSERT INTO guardians" +
			"(first_name,last_name,id_token,home_address,home_city,home_state,home_zip,email,cell_phone, home_phone,work_phone,work_name)" +
			"VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12) RETURNING id", [first_name,last_name,id_token,home_address,home_city,home_state,home_zip,email,
		cell_phone, home_phone,work_phone,work_name], function (error, result){
				if (error) return console.log(error);
				callback(result);
			}
		);
	}

	var saveStudent= function(first_name, middle_name, last_name, birthdate, gender, social_security, race_ethnicity, guardian_id, rel_to_student,callback1,callback2){
		pool.query (
			"INSERT INTO students" +
			"(first_name, middle_name, last_name, birthdate, gender, social_security, race_ethnicity)" +
			"VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", [first_name, middle_name, last_name, birthdate, gender, social_security, race_ethnicity], function (error, result){
				if (error) return console.log(error);
				callback1(result.rows[0].id, first_name,guardian_id, rel_to_student);
				callback2(result);
			}
		);
	}

	var saveStudentGuardian= function(student_id, student_first, guardian_id, rel_to_student){
		pool.query (
			"INSERT INTO student_guardian" +
			"(student_id, student_first, guardian_id, rel_to_student)" +
			"VALUES ($1, $2, $3, $4) RETURNING id", [student_id, student_first, guardian_id, rel_to_student], function (error, result){
				if (error) return console.log(error);
			}
		);
	}

	var readProfile= function(id_token,callback){
		pool.query(
			"SELECT * FROM guardians" +
			" WHERE id_token = $1", [id_token], function(error, result){
				if (error) return console.log(error);
				//console.log(result);
				callback(result);
			}
		);
	}

	var findGuardianKids= function(guardian_id,callback){
		pool.query(
			"SELECT * FROM student_guardian" +
			" WHERE guardian_id = $1", [guardian_id], function(error, result){
				if (error) return console.log(error);
				callback(result);
			}
		);

	}

	var readStudentProfile= function(first_name,last_name,callback){
		pool.query(
			"SELECT * FROM students" +
			" WHERE first_name = $1 AND"+
			" last_name = $2", [first_name, last_name], function(error, result){
				if (error) return console.log(error);
				console.log(result);
				callback(result);
			}
		);
	}
	
 	return {
 		saveGuardian: saveGuardian,
 		saveStudent: saveStudent,
 		saveStudentGuardian: saveStudentGuardian,
 		readProfile: readProfile,
 		readStudentProfile: readStudentProfile,
 		findGuardianKids: findGuardianKids
	};

})();






