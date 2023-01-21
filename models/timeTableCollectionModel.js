const { Schema, model } = require("mongoose");

const timeTablesCollection = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = model("timeTables", timeTablesCollection);
