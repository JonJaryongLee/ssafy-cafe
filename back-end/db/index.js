const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	// aws ip
	host: "13.209.143.173",
  // mysql username
  user: "jony",
	// mysql user password
	password: "*CSAssistant0522",
	// db name
	database: "jony_cafe",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = { pool };
