const timeTable = require("../entities/classes/timeTable");
const tasks = require("../entities/classes/task");

module.exports = {

  async getAll() {
    try {
      return await timeTable.getTimetables();

    } catch {
      throw new Error('DB error');
    }
  },

  async delete() {
    try {
      await timeTable.removeTimeTables({});
      await tasks.removeTasks({});
    } catch {
      throw new Error('DB error')
    }

  },
  async getByID(ttID) {
    try {
      return await timeTable.getTimetableByID(ttID);
    } catch {
      throw new Error('DB error');
    }
  },
  async create(name) {
    try {
      return await timeTable.addTimetable({
        name
      });
    } catch {
      throw new Error('DB error');
    }
  },
  async deleteByID(ttID) {
    if (!await timeTable.getTimetableByID(ttID))
      throw new Error('No such timetable');

    try {

      let deletedTimeTablesInfo = await timeTable.removeTimetableByID(
          ttID
      );
      let deletedTasksInfo = await tasks.removeTasks({
        timeTableID: ttID,
      });

      return [
        {about: "DeletedTimeTables", ...deletedTimeTablesInfo},
        {about: "DeletedTasks", ...deletedTasksInfo},
      ]
    } catch {
      throw new Error('DB error');
    }

  },
  
}