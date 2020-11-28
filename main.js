"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  // layouts = require("express-ejs-layouts"),
  MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });

  db.collection("contacts").insert(
    {
      name: "Freddie Mercury",
      email: "fred@queen.com",
    },
    (error, db) => {
      if (error) throw error;
      console.log(db);
    }
  );
});

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Welcome!");
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
