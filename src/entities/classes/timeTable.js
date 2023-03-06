const timeTableModel = require("../models/timeTableCollectionModel.js");

const TimeTable = {
  async addTimetable(data) {
    try {
      return await timeTableModel.insertMany([data]);
    } catch {
      throw new Error("DB error");
    }
  },
  async getTimetables(filter) {
    try {
      return await timeTableModel.find(filter);
    } catch {
      throw new Error("DB error");
    }
  },
  async getTimetableByID(filter) {
    try {
      return await timeTableModel.findOne(filter);
    } catch {
      throw new Error("DB error");
    }
  },

  async removeTimetableByID(filter) {
    try {
      return await timeTableModel.deleteMany(filter);
    } catch {
      throw new Error("DB error");
    }
  },

};
module.exports = TimeTable;
