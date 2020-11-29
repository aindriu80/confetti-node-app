"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  // layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Subscriber = require("./models/subscriber");

const db = mongoose.connection;

db.once("open", () => {
  console.log("Sucessfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

var subscriber1 = new Subscriber({
  name: "Aindriú Mac Giolla Eoin",
  email: "name@gmail.com",
});

subscriber1.save((error, savedDocument) => {
  if (error) console.log(error);
  console.log(savedDocument);
});

Subscriber.create(
  {
    name: "Person name 2",
    email: "email2@gmail.com",
  },
  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);

var myQuery = Subscriber.findOne({
  name: "Aindriú Mac Giolla Eoin",
}).where("email", /wexler/);

myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});

const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.get("/contact", homeController.postedSignUpForm);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
