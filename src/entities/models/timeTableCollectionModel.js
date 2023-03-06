const {Schema, model} = require("mongoose");

const timeTablesCollection = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      creatorEmail: {
        type: String,
        required: true,
      },
      // usersForSharing: [{email: {type: String, required: true}, access: {type: Number, required: true}}]
    },
    {versionKey: false}
);

module.exports = model("timeTables", timeTablesCollection);
