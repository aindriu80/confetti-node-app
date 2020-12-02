const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [],
  eirCode: {
    type: Number,
    min: [10000, "Eircode code too short"],
    max: 99999,
  },
});

module.exports = mongoose.model("Course", courseSchema);
