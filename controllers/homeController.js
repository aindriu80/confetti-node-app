"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.sendReqParam = (req, res) => {
  let workPage = req.params.work;
  res.send(`Hello from ${workPage} route!`);
};

exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName;
  res.render("index", { name: paramsName });
};
