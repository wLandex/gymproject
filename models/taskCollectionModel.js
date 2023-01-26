const { Schema, model } = require("mongoose");

const tasksCollection = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeTableID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = model("tasks", tasksCollection);
