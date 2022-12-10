const express = require("express");
const router = express.Router();
const pool = require("../database");
const Courses = require("../models/coursesModel");

//GET LIST OF AVAILABLE COURSES
router.get("/", (req, res) => {
  const Title = req.query.Title;

  //Interchange function getAll and getAvailableCourses depending on what is needed
  Courses.getAvailableCourses(Title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retrieving courses.",
      });
    else res.send(data);
  });
});

//UPDATE COURSE BY ID
//For this application, Admin can set availability of a course as well as
//assign courses to teachers with this API

router.put("/:CourseID", (req, res) => {
  //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty!",
    });
  }
  console.log(req.body);

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
});

module.exports = router;
