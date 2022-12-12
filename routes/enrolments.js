const express = require("express");
const router = express.Router();
const pool = require("../database");
const Enrolments = require("../models/enrolmentsModel");

//ADD NEW ENROLMENT
router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty!",
    });
  }

  const enrolment = new Enrolments({
    EnrolmentID: req.body.EnrolmentID,
    Mark: 0,
    CourseID: req.body.CourseID,
    UserID: req.body.UserID,
  });

  Enrolments.create(enrolment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving enrolments.",
      });
    else res.send(data);
  });
});

//GET LIST OF AVAILABLE ENROLMENTS
router.get("/", (req, res) => {
  const Title = req.query.Title;
  Enrolments.getAll(Title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving enrolments.",
      });
    else res.send(data);
  });
});

//UPDATE STUDENT MARKS USING ENROLMENT ID
router.put("/:EnrolmentID", (req, res) => {
  //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty!",
    });
  }
  console.log(req.body);

  Enrolments.updateById(
    req.params.EnrolmentID,
    new Enrolments(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "Enrolment_not_found") {
          res.status(404).send({
            message: `Enrolment with EnrolmentID ${req.params.EnrolmentID} not found.`,
          });
        } else {
          res.status(500).send({
            message:
              "Some error occured while updating enrolment with ID " +
              req.params.EnrolmentID,
          });
        }
      } else res.send(data);
    }
  );
});

//GET ENROLMENT DETAILS
router.get("/details", (req, res) => {
  const Title = req.query.Title;
  Enrolments.getEnrolmentDetails(Title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving enrolment details.",
      });
    else res.send(data);
  });
});

module.exports = router;
