const timeTableCollection = require("../models/timeTable");

class timetable {
  constructor(name, DB) {
    this.name = name;
    this.DB = DB;
  }

  /**
   *
   * @param {
   *         name : string,
   *         description: string
   * } data
   */
  async addTask(data) {
    console.log(data);

    if (data.name && data.description)
      return await timeTableCollection.insertMany([data]);
    else {
      throw new Error("Invalid data must be named");
    }
  }
  async getTasks(filter) {
    return await timeTableCollection.find(filter);
  }

  async getTask(filter) {
    return await timeTableCollection.findOne(filter);
  }

  async getTaskByID(id) {
    return await timeTableCollection.findOne({ _id: id });
  }

  async removeTaskByID(id) {
    return await timeTableCollection.remove({ _id: id });
  }
  async removeTasks(filter) {
    return await timeTableCollection.remove(filter);
  }
  async changeTask(id, changes) {
    return await timeTableCollection.updateOne({ _id: id }, { $set: changes });
  }
}

module.exports = timetable;
