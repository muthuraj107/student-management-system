const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
  {
    courseName: { type: String, required: true },

    courseFees: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

  module.exports = mongoose.model('course',courseSchema)