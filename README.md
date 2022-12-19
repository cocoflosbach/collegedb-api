# collegedb-api

## Background

This is a REST API built using Node.js and Express was developed to connect to and query data from a college database built using MySQL. The database is made up of four tables (users, courses, enrolments and roles) that define the structure of the data. For this API, clear functional requirements were defined in the development brief and they include:

Functional requirements:
1) Admins should be able to enable or disable the availability of a course
2) Admins should be able to assign one or more courses to a teacher
3) Students can browse and list all the available courses and see the course title and course
teacher’s name.
4) Students can enrol in a course. Students should not be able to enrol in a course more than
once at each time.
5) Teachers can fail or pass a student.
6) Access control for Admins, Teachers and Students: Ensure only the authorized access can
perform an action. For example, only teachers can pass/fail a student.
Here is a suggested method: In the API, on every request, get the primary key of a user as
part of the request/input parameters and before performing an action, check if the user
with the primary key is authorized to perform e a request. 

## Install

To run this project locally, [node](http://nodejs.org) and [npm](https://npmjs.com) are required installations. Other packages needed to run the program include

Functional requirements:
1) express
2) Nodemon

Packages can be installed using:

```sh
$ npm install
```


## Usage

To start the server, ensure that the password in db.config matches your local root password and then run the command:

```sh
$ node app.js
```
or if start has been configured in package.json file, run command

```sh
$ npm start
```


## Postman

For this project's functional requirements, we will use 3 types of request in Postman:
1) GET - To view database queries
2) PUT - To update entries in the database
3) POST - To add entries to the database

Each functional requirement method can be actioned in Postman as follows:

1) Functional requirements 1 and 2 (PUT)
* Use PUT and enter the URL: http://localhost:3000/courses/:CourseID
* In the above URL, replace :CourseID with the CourseID you want to update e.g http://localhost:3000/courses/1
* Go to "body" tab, tick "raw" and enter the chosen key value pairs for TeacherID and isAvailable in JSON format
* Press send to update the values

3) Functional requirement 3 (GET)
* Use GET and enter the URL: http://localhost:3000/courses/available
* Press send to obtain a list of available courses and their corresponding teacher names

4) Functional requirement 4 (POST)
* Use POST and enter the URL: http://localhost:3000/enrolments
* Go to "body" tab, tick "raw" and enter the chosen key value pairs for Mark, UserID and CourseID in JSON format
* Press send to generate a new EnrolmentID with the chosen key value pairs

5) Functional requirement 5 (PUT)
* Use PUT and enter the URL: http://localhost:3000/enrolments/:EnrolmentID
* In the above URL, replace :EnrolmentID with the EnrolmentID you want to update e.g http://localhost:3000/enrolments/1
* Go to "body" tab, tick "raw" and enter the chosen key value pairs for Mark, CourseID and UserID in JSON format
* Press send to update the values

## Known issues
* This projects attempts to implement Role Based Access Control based on the user's UserID
* As of Monday 19th December 2022, all functions remain available to all UserID's
* This is a known issue and any additional time spent on this project would be aimed at tackling this issue







