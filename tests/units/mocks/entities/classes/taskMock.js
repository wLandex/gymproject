const helpers = require("../../../../helpers");
const DB = [];
module.exports = {
  async addTask(data) {
    data = {...data, _id: helpers.getMongoID()}
    DB.push(data)
    return DB[DB.length - 1];
  },
  async getTasks() {
    return DB;
  },

  async getTask(filter) {
    return DB.filter((record) => {
      return Object.keys(filter).some((key) => {
        return record[key] === filter[key];
      });
    });
  },

  async getTaskByID(id) {
    return DB.find((elem) => elem._id === id);
  },

  async removeTaskByID(id) {
    let removed;
    DB.forEach((elem, i) => {
      if (elem._id === id) {
        DB.splice(i, 1);
        removed = elem;
      }
      return removed;
    })
  },
  async removeTasks() {
    DB.length = 0;
    return DB
  },
  async changeTask(id, changes) {
    let elem = await this.getTaskByID(id)
    return Object.assign(elem, changes);
  },
};