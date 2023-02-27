module.exports = class TimeTable {
  constructor(timeTableClass, taskClass) {
    this.timeTableClass = timeTableClass;
    this.taskClass = taskClass;

  }

  async getAll(userEmail) {
    try {
      return await this.timeTableClass.getTimetables({creatorEmail: userEmail});

    } catch {
      throw new Error('DB error ');
    }
  }

  async deleteByID(ttID, userEmail) {
    if (!await this.timeTableClass.getTimetableByID(ttID))
      throw new Error('No such timetable');

    try {

      let deletedTimeTablesInfo = await this.timeTableClass.removeTimetableByID(
          {_id: ttID, creatorEmail: userEmail}
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

  async getByID(ttID, userEmail) {
    try {
      return await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail: userEmail});
    } catch {
      throw new Error('DB error');
    }
  }

  async create(name, userEmail) {
    try {
      return await this.timeTableClass.addTimetable({
        name,
        creatorEmail: userEmail
      });
    } catch {
      throw new Error('DB error');
    }
  }


}