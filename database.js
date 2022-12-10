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

/*pool.query(`SELECT * FROM mydb.users`, (err, res) => {
  const users = res;
  if (err) console.log(err);
  return console.log(users);
});
pool.query(`SELECT * FROM mydb.courses`, (err, res) => {
  const users = res;
  if (err) console.log(err);
  return console.log(users);
});
pool.query(`SELECT * FROM mydb.enrolments`, (err, res) => {
  const users = res;
  if (err) console.log(err);
  return console.log(users);
});
pool.query(`SELECT * FROM mydb.roles`, (err, res) => {
  const users = res;
  if (err) console.log(err);
  return console.log(users);
});
*/

module.exports = connection;
