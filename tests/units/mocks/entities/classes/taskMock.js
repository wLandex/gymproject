const helpers = require("../../../../helpers");

module.exports = class {
  DB = []

  async addTask(data) {
    data = {...data, _id: helpers.getMongoID()}
    this.DB.push(data)
    return this.DB[this.DB.length - 1];
  }

  async getTasks(ttID) {
    return this.DB.filter((task) => {
      return task.timeTableID === ttID.timeTableID;
    });
  }

  async getTask(filter) {
    return this.DB.filter((record) => {
      return Object.keys(filter).some((key) => {
        return record[key] === filter[key];
      });
    });
  }

  async getTaskByID(id) {
    return this.DB.find((elem) => elem._id === id);
  }

  async removeTaskByID(id) {
    let removed;
    this.DB.forEach((elem, i) => {
      if (elem._id === id) {
        removed = elem;
        this.DB.splice(i, 1);
      }
    })
    return removed;
  }

  async removeTasks(ttID) {
    if (!ttID.timeTableID) {
      this.DB.length = 0;
      return this.DB;
    }

    for (let i = 0; i < this.DB.length;) {
      if (this.DB[i].timeTableID === ttID.timeTableID) {
        this.DB.splice(i, 1);
        continue;
      }
      i++
    }
    return this.DB
  }

  async changeTask(id, changes) {
    let elem = await this.getTaskByID(id)
    return Object.assign(elem, changes);
  }

};