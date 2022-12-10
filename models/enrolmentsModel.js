const sqlDatabase = require("../database");

//DEFINE ENROLMENT CONSTRUCTOR

const Enrolments = function (enrolment) {
  this.EnrolmentID = enrolment.EnrolmentID;
  this.Mark = enrolment.Mark;
  this.CourseID = enrolment.CourseID;
  this.UserID = enrolment.UserID;
};

//MODEL TO ADD A NEW ENROLMENT
Enrolments.create = (newEnrolment, result) => {
  sqlDatabase.query(
    "INSERT INTO mydb.enrolments SET ?",
    newEnrolment,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created enrolment: ", {
        EnrolmentID: res.insertId,
        ...newEnrolment,
      });
      result(null, { EnrolmentID: res.insertId, ...newEnrolment });
    }
  );
};

//MODEL TO GET LIST OF ALL ENROLMENTS
Enrolments.getAll = (Title, result) => {
  let query = "SELECT * FROM mydb.enrolments";
  if (Title) {
    query += `WHERE Title LIKE '%${Title}%'`;
  }
  sqlDatabase.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("enrolments: ", res);
    result(null, res);
  });
};
module.exports = Enrolments;

//MODEL TO UPDATE STUDENT SCORES BY ENROLMENT ID
Enrolments.updateById = (EnrolmentID, enrolment, result) => {
  sqlDatabase.query(
    "UPDATE mydb.enrolments SET Mark = ? WHERE EnrolmentID = ?",
    [enrolment.Mark, EnrolmentID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        //Define error message type
        result({ kind: "Enrolment_not_found" }, null);
        return;
      }
      console.log("updated enrolment: ", {
        EnrolmentID: EnrolmentID,
        ...enrolment,
      });
      result(null, { EnrolmentID: EnrolmentID, ...enrolment });
    }
  );
};
