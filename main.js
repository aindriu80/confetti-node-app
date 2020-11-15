"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

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

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
