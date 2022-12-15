const sqlDatabase = require("../database");

//DEFINE ENROLMENT CONSTRUCTOR

const Enrolments = function (enrolment) {
  this.EnrolmentID = enrolment.EnrolmentID;
  this.Mark = enrolment.Mark;
  this.CourseID = enrolment.CourseID;
  this.UserID = enrolment.UserID;
};

//MODEL TO ADD A NEW ENROLMENT
//FUNCTIONAL REQUIREMENT 4. THIS MODEL ALLOWS STUDENTS TO ENROL IN A COURSE
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

//MODEL TO GET LIST OF ENROLMENTS WITH DETAILS
Enrolments.getEnrolmentDetails = (Title, result) => {
  let query =
    "SELECT courses.CourseID, courses.Title, enrolments.UserID, users.Name, enrolments.EnrolmentID FROM courses JOIN enrolments ON courses.CourseID = enrolments.CourseID JOIN users ON enrolments.UserID = users.UserID;";
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

//MODEL TO UPDATE STUDENT SCORES BY ENROLMENT ID
//FUNCTIONAL REQUIREMENT 5. TEACHERS CAN PASS OR FAIL STUDENTS
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

//MODEL TO GET LIST OF STUDENT GRADES
//TEACHER VIEW FOR FUNCTIONAL REQUIREMENT 5 SO THEY CAN SEE STUDENT GRADE DETAILS
Enrolments.getStudentGrades = (Title, result) => {
  let query =
    "SELECT users.UserID, users.Name AS StudentName, courses.Title AS CourseTitle, enrolments.Mark FROM users JOIN enrolments ON users.UserID = enrolments.UserID JOIN courses ON enrolments.CourseID = courses.CourseID;";
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
