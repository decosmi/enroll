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

	var saveGuardian= function(first_name,last_name,home_address,home_city,home_state,home_zip,email,
		cell_phone, home_phone,work_phone,work_name,callback){
		pool.query (
			"INSERT INTO guardians" +
			"(first_name,last_name,home_address,home_city,home_state,home_zip,email,cell_phone, home_phone,work_phone,work_name)" +
			"VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id", [first_name,last_name,home_address,home_city,home_state,home_zip,email,
		cell_phone, home_phone,work_phone,work_name], function (error, result){
				if (error) return console.log(error);
				callback(result);
			}
		);
	}

	
 	return {
 		saveGuardian: saveGuardian
	};

})();






