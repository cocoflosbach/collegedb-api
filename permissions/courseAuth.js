const sqlDatabase = require("../database");

const Role = sqlDatabase.query("SELECT * FROM mydb.roles");
const users = sqlDatabase.query("SELECT * FROM mydb.users");

function adminAccess(user, course) {
  const allowedUsers = sqlDatabase.query(
    "SELECT * FROM mydb.users WHERE RoleID = 1"
  );
  return user.UserID === allowedUsers.UserID;
}

module.exports = { adminAccess };
