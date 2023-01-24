const taskCollection = require("../models/taskCollectionModel");

timetable = {
  async addTask(data) {
    if (data.name && data.description)
      return await taskCollection.insertMany([data]);
    else {
      throw new Error("Invalid data must be named");
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
    let result = await taskCollection.updateOne({ _id: id }, { $set: changes });
    return await this.getTaskByID(id);
  },
};

module.exports = timetable;
