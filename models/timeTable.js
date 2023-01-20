const { Schema, model } = require("mongoose");

const timetableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = model("timetables", timetableSchema);
