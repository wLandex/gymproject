const DB = [];
const helpers = require("../../../../helpers/index.js");

module.exports = {
  async addTimetable(data) {
    data = {...data, _id: helpers.getMongoID()}
    DB.push([data])
    return DB[DB.length - 1];

  },
  async getTimetables() {
    return DB;
  },
  async getTimetableByID(id) {
    return DB.find((elem) => elem._id === id);
  },

  async removeTimetableByID(id) {
    let removed;
    DB.forEach((elem, i) => {
      if (elem._id === id) {
        DB.splice(i, 1);
        removed = elem;
      }
      return removed;
    })
  },
  async removeTimeTables(filter) {
    DB.length = 0;
    return DB
  },
};
