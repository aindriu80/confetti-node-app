"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");

const port = 3000;
app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(errorController.logErrors);
app.use(layouts);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.use(express.static("public"));
app.use("/public/", express.static("public/"));
app.use(express.static(process.cwd() + "public"));

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.get("/items/:vegetable", homeController.sendReqParam);
app.get("/:work", homeController.sendReqParam);
app.get("/name/:myName", homeController.respondWithName);

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
