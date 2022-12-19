const sqlDatabase = require("../database");

//DEFINE USER CONSTRUCTOR

const Users = function (user) {
  this.UserID = user.UserID;
  this.Name = user.Name;
  this.RoleID = user.RoleID;
};

Users.create = (newUser, result) => {
  sqlDatabase.query("INSERT INTO mydb.users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created user: ", { UserID: res.insertId, ...newUser });
    result(null, { UserID: res.insertId, ...newUser });
  });
};

//MODEL TO GET A LIST OF ALL USERS
Users.getAll = (Name, result) => {
  let query = "SELECT * FROM mydb.users";

  if (Name) {
    query += `WHERE Name LIKE '%${Name}%'`;
  }
  sqlDatabase.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("users: ", res);
    return result(null, res);
  });
};

//MODEL TO UPDATE USER BY ID

Users.updateById = (UserID, user, result) => {
  sqlDatabase.query(
    "UPDATE mydb.users SET Name = ?, RoleID = ? WHERE UserID = ?",
    [user.Name, user.RoleID, UserID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        //Define error message type
        result({ kind: "User_not_found" });
        return;
      }
      console.log("updated user: ", { UserID: UserID, ...user });
      result(null, { UserID: UserID, ...user });
    }
  );
};

module.exports = Users;
