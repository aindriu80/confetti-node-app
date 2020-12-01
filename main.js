"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Sucessfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});

const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.get("/contact", homeController.postedSignUpForm);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
