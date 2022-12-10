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

//MODEL TO GET A LIST OF ALL AVAILABLE COURSES
Courses.getAvailableCourses = (Title, result) => {
  let query = "SELECT * FROM mydb.courses WHERE isAvailable = 1";

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
