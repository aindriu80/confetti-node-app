const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  courseSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      maxStudents: {
        type: Number,
        default: 0,
        min: ["Course cannot have a negative number of students"],
      },
      cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"],
      },
    },
    { timestampstrue }
  );

module.exports = mongoose.model("Course", courseSchema);
