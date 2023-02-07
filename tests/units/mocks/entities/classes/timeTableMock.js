const helpers = require("../../../../helpers/index.js");

module.exports = class {
  DB = []

  async addTimetable(data) {
    data = {...data, _id: helpers.getMongoID()}
    this.DB.push(data)
    return this.DB[this.DB.length - 1];

  }

  async getTimetables() {
    return this.DB;
  }

  async getTimetableByID(id) {
    return this.DB.find((elem) => elem._id === id);
  }

  async removeTimetableByID(id) {
    let removed;
    this.DB.forEach((elem, i) => {
      if (elem._id === id) {
        this.DB.splice(i, 1);
        removed = elem;
      }
      return removed;
    })
  }

  async removeTimeTables(filter) {
    this.DB.length = 0;
    return this.DB
  }
};
