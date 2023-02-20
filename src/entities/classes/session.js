const sessionModel = require("../models/sessionCollection.js");

module.exports = {
  async create(userID, accessToken, refreshToken, expireAtRefreshToken, expireAtAccessToken) {
    try {
      return await sessionModel.insertMany([{
        userID,
        accessToken,
        refreshToken,
        expireAtRefreshToken,
        expireAtAccessToken
      }]);
    } catch {
      throw new Error("DB error");
    }
  },

}