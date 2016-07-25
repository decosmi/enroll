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

	
 	return {
	};

})();





