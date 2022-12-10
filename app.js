const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//IMPORTING ROUTES
const userRoute = require("./routes/users");
app.use("/users", userRoute);
const courseRoute = require("./routes/courses");
app.use("/courses", courseRoute);
const enrolmentRoute = require("./routes/enrolments");
app.use("/enrolments", enrolmentRoute);

//BASE ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to the college database API");
});

// Start listening to the server
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
);
