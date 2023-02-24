const sessionModel = require("../models/sessionCollection.js");
const taskCollection = require("../models/taskCollectionModel");

module.exports = {
  async create(userID, accessToken, refreshToken, expireAtAccessToken, expireAtRefreshToken) {
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

  async refresh(oldRefreshToken, ...changes) {
    try {
      return await sessionModel.updateOne({refreshToken: oldRefreshToken}, {$set: changes[0]});

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

  }


}