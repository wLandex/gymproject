const sessionModel = require("../models/sessionCollection.js");
const randToken = require('rand-token');


module.exports = {
  async create(userID, userEmail, accessToken, refreshToken, expireAtAccessToken, expireAtRefreshToken) {
    try {
      return await sessionModel.insertMany([{
        userID,
        userEmail,
        accessToken,
        refreshToken,
        expireAtRefreshToken,
        expireAtAccessToken
      }]);
    } catch {
      throw new Error("DB error");
    }
  },

  async refresh(oldRefreshToken, changes) {
    try {
      return await sessionModel.updateOne({refreshToken: oldRefreshToken}, {$set: changes});

    } catch {
      throw new Error('DB error')
    }
  },

  async findByRefreshToken(refreshToken) {
    try {

      return await sessionModel.findOne({refreshToken});
    } catch {
      throw new Error('DB error')

    }

  },

  async findByAccessToken(accessToken) {
    try {

      return await sessionModel.findOne({accessToken});
    } catch {
      throw new Error('DB error')

    }

  },
  generateToken() {
    return randToken.generate(32);
  }


}