const taskCollection = require("../models/taskCollectionModel");

timetable = {
  async addTask(data) {
    try {
      return await taskCollection.insertMany([data]);
    } catch {
      throw new Error("DB error");
    }
  },
  async getTasks(filter) {
    return await taskCollection.find(filter);
  },

  async getTask(filter) {
    return await taskCollection.findOne(filter);
  },

  async getTaskByID(id) {
    return await taskCollection.findOne({ _id: id });
  },

  async removeTaskByID(id) {
    return await taskCollection.deleteMany({ _id: id });
  },
  async removeTasks(filter) {
    try {
      return await taskCollection.deleteMany(filter);
    } catch {
      throw new Error("DB error");
    }
  },
  async changeTask(id, changes) {
    try {
      let result = await taskCollection.updateOne(
        { _id: id },
        { $set: changes }
      );
      return await this.getTaskByID(id);
    } catch {
      throw new Error("DB error");
    }
  },
};

module.exports = timetable;
