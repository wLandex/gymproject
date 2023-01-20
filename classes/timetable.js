const taskCollection = require("../models/taskCollection");
const timeTableCollection = require("../models/timeTableCollection");

class timetable {
  constructor(name, parentID) {
    this.name = name;
    this.timeTableID = parentID;
  }

  async addTask(data) {
    data.timeTableID = this.id;
    if (data.name && data.description)
      return await taskCollection.insertMany([data]);
    else {
      throw new Error("Invalid data must be named");
    }
  }
  async getTasks(filter) {
    return await taskCollection.find(filter);
  }

  async getTask(filter) {
    return await taskCollection.findOne(filter);
  }

  async getTaskByID(id) {
    return await taskCollection.findOne({ _id: id });
  }

  async removeTaskByID(id) {
    return await taskCollection.remove({ _id: id });
  }
  async removeTasks(filter) {
    return await taskCollection.remove(filter);
  }
  async changeTask(id, changes) {
    let result = await taskCollection.updateOne({ _id: id }, { $set: changes });
    return await this.getTaskByID(id);
  }
}

module.exports = timetable;
