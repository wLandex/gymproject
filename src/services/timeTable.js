module.exports = class TimeTable {
  constructor(timeTableClass, taskClass) {
    this.timeTableClass = timeTableClass;
    this.taskClass = taskClass;

  }

  async getAll(creatorEmail) {
    try {
      return await this.timeTableClass.getTimetables({creatorEmail});

    } catch {
      throw new Error('DB error ');
    }
  }

  async deleteByID(ttID, creatorEmail) {
    if (!await this.timeTableClass.getTimetableByID(ttID))
      throw new Error('No such timetable');

    try {

      let deletedTimeTablesInfo = await this.timeTableClass.removeTimetableByID(
          {_id: ttID, creatorEmail}
      );
      let deletedTasksInfo = await this.taskClass.removeTasks({
        timeTableID: ttID,
      });

      return [
        {about: "DeletedTimeTables", ...deletedTimeTablesInfo},
        {about: "DeletedTasks", ...deletedTasksInfo},
      ]
    } catch {
      throw new Error('DB error');
    }

  }

  async getByID(ttID, creatorEmail) {
    try {
      return await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail});
    } catch {
      throw new Error('DB error');
    }
  }

  async create(name, creatorEmail) {
    try {
      return await this.timeTableClass.addTimetable({
        name,
        creatorEmail
      });
    } catch {
      throw new Error('DB error');
    }
  }


}