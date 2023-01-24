const timeTabelModel = require("../models/timeTableCollectionModel.js");

module.exports = {
  async addTimetable(data) {
    if (data.name) return await timeTabelModel.insertMany([data]);
    else {
      throw new Error("Invalid data must be named");
    }
  },
  async getTimetables(filter = {}) {
    return await timeTabelModel.find(filter);
  },

  async getTimetable(filter) {
    return await timeTabelModel.findOne(filter);
  },

  async getTimetableByID(id) {
    return await timeTabelModel.findOne({ _id: id });
  },

  async removeTimetableByID(id) {
    return await timeTabelModel.deleteMany({ _id: id });
  },
  async removeTasks(filter) {
    return await timeTabelModel.deleteMany(filter);
  },
};
