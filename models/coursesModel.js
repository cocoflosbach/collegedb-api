const sqlDatabase = require("../database");

//DEFINE COURSE CONSTRUCTOR

const Courses = function (course) {
  this.CourseID = course.CourseID;
  this.Title = course.Title;
  this.TeacherID = course.TeacherID;
  this.isAvailable = course.isAvailable;
};

//MODEL TO ADD A NEW COURSE
Courses.create = (newCourse, result) => {
  sqlDatabase.query("INSERT INTO mydb.courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

//MODEL TO GET A LIST OF ALL COURSES
Courses.getAll = (Title, result) => {
  let query = "SELECT * FROM mydb.courses";

  if (Title) {
    query += `WHERE Title LIKE '%${Title}%'`;
  }
  sqlDatabase.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};


//MODEL TO GET LIST OF COURSES WITH ASSIGNED TEACHERS
//ADMIN VIEW FOR FUNCTIONAL REQUIREMENTS 1 AND 2 WHERE ADMINS CAN SEE THE COUNT OF STUDENT ENROLMENTS ASSIGNED TO A TEACHER ID
Courses.getAssignedCourses = (Title, result) => {
  if (Title) {
    query += `WHERE Title LIKE '%${Title}%'`;
  }
  sqlDatabase.query(
    "SELECT courses.CourseID, courses.Title, COUNT(enrolments.CourseID) AS NumberOfEnrolments, courses.TeacherID FROM enrolments RIGHT JOIN courses ON enrolments.CourseID = courses.CourseID GROUP BY courses.Title, courses.CourseID, courses.TeacherID;",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("courses: ", res);
      result(null, res);
    }
  );
};

//FUNCTIONAL REQUIREMENT 3
//MODEL FOR STUDENT'S TO GET A LIST OF ALL AVAILABLE COURSES WITH THE ASSOCIATED TEACHER'S NAME
Courses.getAvailableCourses = (Title, result) => {
  let query =
    "SELECT courses.CourseID, courses.Title, users.Name AS TeacherName FROM courses JOIN users ON courses.TeacherID = users.UserID WHERE isAvailable = 1 AND RoleID = 2";

  if (Title) {
    query += `WHERE Title LIKE '%${Title}%'`;
  }
  sqlDatabase.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

//MODEL TO UPDATE COURSES BY ID
//For this application, Admin can set availability of a course as well as
//assign courses to teachers with this API

Courses.updateById = (CourseID, course, result) => {
  sqlDatabase.query(
    "UPDATE mydb.courses SET TeacherID = ?, isAvailable = ? WHERE CourseID = ?",
    [course.TeacherID, course.isAvailable, CourseID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        //Define error message type
        result({ kind: "Course_not_found" }, null);
        return;
      }
      console.log("updated course: ", { CourseID: CourseID, ...course });
      result(null, { CourseID: CourseID, ...course });
    }
  );
};

module.exports = Courses;
