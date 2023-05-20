const {Schema, model} = require("mongoose");

const recoveryPasswordCollection = new Schema(
    {
      email: {
        type: String,
        required: true,
      },

      recoveryToken: {
        type: String,
        required: true,
      },

      expireAt: {
        type: Date,
        required: true,
      }
      ,
      isUsed: {
        type: Boolean,
        required: true,
      }


    },
    {versionKey: false}
);

module.exports = model("recoveryPasswordCollection", recoveryPasswordCollection);
