const express = require("express");
const router = express.Router();
const connection = require("../database");
const Users = require("../models/usersModel");

//GET LIST OF ALL USERS

router.get("/", (req, res) => {
  const Name = req.query.Name;

  Users.getAll(Name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retirving users.",
      });
    else res.send(data);
  });
});

router.put("/:UserID", (req, res) => {
  //Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty!",
    });
  }
  console.log(req.body);
  Users.updateById(req.params.UserID, new Users(req.body), (err, data) => {
    if (err) {
      if (err.kind === "User_not_found") {
        res.status(404).send({
          message: `User with id ${req.params.UserID} not found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Some error occured while updating user with id " +
            req.params.UserID,
        });
      }
    } else res.send(data);
  });
});

module.exports = router;
