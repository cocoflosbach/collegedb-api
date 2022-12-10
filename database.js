const mysql = require("mysql2");
const dbConfig = require("./config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
});

//OPEN MYSQL CONNECTION
connection.connect((error) => {
  if (error) throw error;
  console.log("Database connection successful.");
});

module.exports = connection;
