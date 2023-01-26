const timeTabelModel = require("../models/timeTableCollectionModel.js");

module.exports = {
  async addTimetable(data) {
    try {
      return await timeTabelModel.insertMany([data]);
    } catch {
      throw new Error("DB error");
    }
  },
  async getTimetables(filter = {}) {
    try {
      return await timeTabelModel.find(filter);
    } catch {
      throw new Error("DB error");
    }
  },
  async getTimetableByID(id) {
    try {
      return await timeTabelModel.findOne({ _id: id });
    } catch {
      throw new Error("DB error");
    }
  },

  async removeTimetableByID(id) {
    try {
      return await timeTabelModel.deleteMany({ _id: id });
    } catch {
      throw new Error("DB error");
    }
  },
  async removeTimeTables(filter) {
    try {
      return await timeTabelModel.deleteMany(filter);
    } catch {
      throw new Error("DB error");
    }
  },
};
