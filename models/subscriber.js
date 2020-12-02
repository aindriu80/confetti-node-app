"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    eirCode: {
      type: Number,
      min: [10000, "Eircode too short"],
      max: 99999,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  });

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Eircode: ${this.eirCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function () {
  return this.model("Subscriber").find({ eirCode: this.eirCode }).exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
