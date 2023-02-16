const userModel = require("../models/userCollection.js");

module.exports = {
  async create(email, hash) {
    try {
      return await userModel.insertMany([{email, hashPassword: hash}]);
    } catch {
      throw new Error("DB error");
    }
  },

  async getUserByEmail(email) {
    try {
      return await userModel.findOne({email});
    } catch {
      throw new Error("DB error");
    }
  }


}