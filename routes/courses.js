const express = require("express");
const router = express.Router();
const pool = require("../database");
const Courses = require("../models/coursesModel");
const sqlDatabase = require("../database");

//GET LIST OF ALL COURSES
router.get("/", (req, res) => {
  const Title = req.query.Title;

  Courses.getAll(Title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retrieving courses.",
      });
    else res.send(data);
  });
});

//GET LIST OF AVAILABLE COURSES
router.get("/available", (req, res) => {
  const Title = req.query.Title;

  Courses.getAvailableCourses(Title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving available courses.",
      });
    else res.send(data);
  });
});

//UPDATE COURSE BY ID
//For this application, Admin can set availability of a course as well as
//assign courses to teachers with this API function

router.put("/:CourseID", (req, res) => {
  //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty!",
    });
  }
  console.log(req.body);

  //Authenticate request using UserID
  const userKey = req.headers.authorization;
  const api_key = sqlDatabase.query(
    "SELECT UserID FROM mydb.users WHERE RoleID = 1"
  );

  if (userKey === api_key[0]) {
    Courses.updateById(
      req.params.CourseID,
      new Courses(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "Course_not_found") {
            res.status(404).send({
              message: `Course with CourseID ${req.params.CourseID} not found.`,
            });
          } else {
            res.status(500).send({
              message:
                "Some error occured while updating course with CourseID " +
                req.params.CourseID,
            });
          }
        } else res.send(data);
      }
    );
  } else {
    res.status(401).send("You are not authorised to make these changes.");
  }
});

//GET LIST OF COURSES AND THEIR ASSIGNED TEACHERS

router.get("/assignedcourses", (req, res) => {
  const Title = req.query.Title;

  //Interchange function getAll and getAvailableCourses depending on what is needed
  Courses.getAssignedCourses(Title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retrieving courses.",
      });
    else res.send(data);
  });
});

module.exports = router;
