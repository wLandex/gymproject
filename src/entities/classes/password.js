const recoveryPasswordModel = require("../models/recoveryPasswordCollection.js");
const randToken = require('rand-token');

module.exports = {

  async create(email, recoveryToken, expireAt, isUsed = false) {
    try {
      return await recoveryPasswordModel.insertMany([{email, recoveryToken, expireAt, isUsed}]);

    } catch {
      throw new Error("DB error");
    }
  },

  generateToken() {
    return randToken.generate(32)
  }


}