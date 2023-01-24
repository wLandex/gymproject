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
    return await timeTabelModel.find(filter);
  },

  async getTimetable(filter) {
    return await timeTabelModel.findOne(filter);
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
  async removeTasks(filter) {
    return await timeTabelModel.deleteMany(filter);
  },
};
