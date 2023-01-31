const taskCollection = require("../models/taskCollectionModel");

timetable = {
  async addTask(data) {
    try {
      return (await taskCollection.insertMany([data]))[0];
    } catch {
      throw new Error("DB error");
    }
  },
  async getTasks(filter) {
    try {
      return await taskCollection.find(filter);
    } catch {
      throw new Error("DB error");
    }
  },

  async getTask(filter) {
    try {
      return await taskCollection.findOne(filter);
    } catch {
      throw new Error("DB error");
    }
  },

  async getTaskByID(id) {
    try {
      return await taskCollection.findOne({_id: id});
    } catch {
      throw new Error("DB error");
    }
  },

  async removeTaskByID(id) {
    try {
      return await taskCollection.deleteMany({_id: id});
    } catch {
      throw new Error("DB error");
    }
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
      await taskCollection.updateOne({_id: id}, {$set: changes});
      return await this.getTaskByID(id);
    } catch {
      throw new Error("DB error");
    }
  },
};

module.exports = timetable;
