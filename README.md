# collegedb-api

## Background

This is a REST API built using Node.js and Express was developed to connect to and qery data from a college database built using MySQL. The database is made up of four tables (Users, Courses, Enrolments and Roles) that define the structure of the data. For this API, clear functional requirements were defined in the development brief and they include:

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

To runt this project locally, [node](http://nodejs.org) and [npm](https://npmjs.com) are required installations. Other packages needed to run the program include

Functional requirements:
1) express
2) Nodemon


## Usage

To start the server, run the command

```sh
$ node app.js
```
or if start has been configured in package.json file, run command

```sh
$ npm start
```
