"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;
var subscriberSchema = mongoose.Schema(
  {
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

    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.eirCode}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
