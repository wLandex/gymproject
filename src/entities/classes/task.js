const taskCollection = require("../models/taskCollectionModel");

module.exports = {
  async addTask(data) {
    try {
      return (await taskCollection.insertMany([data]))[0];
    } catch {
      throw new Error("DB error");
    }
  },
  async getTasks(filter, limit, page) {
    try {
      return await taskCollection.find(filter).skip(limit * (page - 1)).limit(limit);
    } catch {
      throw new Error("DB error");
    }
  },

  async getTaskByFilter(filter) {
    try {
      return await taskCollection.findOne(filter);
    } catch {
      throw new Error("DB error");
    }
  },

  async removeTaskByFilter(filter) {
    try {
      return await taskCollection.deleteMany(filter);
    } catch {
      throw new Error("DB error");
    }
  },
  async changeTaskByFilter(filter, changes) {
    try {
      await taskCollection.updateOne(filter, {$set: changes});
      return await this.getTaskByFilter(filter);
    } catch {
      throw new Error("DB error");
    }
  },
};


