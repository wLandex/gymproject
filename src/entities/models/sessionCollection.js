const {Schema, model} = require("mongoose");

const sessionCollection = new Schema(
    {
      userID: {
        type: Schema.Types.ObjectId,
        required: true,
      },

      accessToken: {
        type: String,
        required: true,
        unique: true,
      },

      refreshToken: {
        type: String,
        required: true,
        unique: true,
      },

      expireAtAccessToken: {
        type: Date,
        required: true,
      },

      expireAtRefreshToken: {
        type: Date,
        required: true,

      },
      userEmail: {
        type: String,
        required: true,
      },

    },
    {versionKey: false}
);

module.exports = model("session", sessionCollection);
