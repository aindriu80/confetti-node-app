"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  methodOverride = require("method-override"),
  layouts = require("express-ejs-layouts");

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Sucessfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);

router.use(
  express.urlencoded({
    extended: false,
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.use(express.json());

router.get("/", homeController.index);
router.get("/courses", homeController.showCourses);
router.get("/contact", subscribersController.getSubscriptionPage);
router.get("/users/new", usersController.new);

router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/:id", usersController.show, usersController.showView);
router.post("/subscribe", subscribersController.saveSubscriber);

router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});
