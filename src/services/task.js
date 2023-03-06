module.exports = class Task {
  constructor(timeTableClass, taskClass) {
    this.timeTableClass = timeTableClass;
    this.taskClass = taskClass;

  }

  async getTasks(ttID, limit, page, creatorEmail) {
    if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail})) {
      try {
        return await this.taskClass.getTasks({timeTableID: ttID}, limit, page)
      } catch {
        throw new Error('DB error');
      }

    }
    throw new Error('Incorrect task or timetable')

  }

  async create(ttID, description, name, creatorEmail) {
    try {
      if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail})) {
        return await this.taskClass.addTask({
          name,
          description,
          timeTableID: ttID,
        });

      }
    } catch {
      throw new Error('DB error')
    }

    throw new Error('Cannot find timetable');
  }

  async getTaskByID(ttID, taskID, creatorEmail) {
    try {
      if
      (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail}) &&
          (await this.taskClass.getTaskByFilter({_id: taskID, timeTableID: ttID}))
      ) {
        return await this.taskClass.getTaskByFilter({_id: taskID, timeTableID: ttID});
      }
    } catch {
      throw new Error('DB error');
    }
    throw new Error('Incorrect task or timetable')
  }

  async deleteTaskByID(taskID, ttID, creatorEmail) {
    if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail})) {
      try {
        return await this.taskClass.removeTaskByFilter({_id: taskID, timeTableID: ttID});

      } catch {
        throw new Error('DB error')
      }

    }
    throw new Error('Incorrect task or timetable')
  }

  // Might need to add finding if timetable with some ttID exist.
  async changeTaskByID(taskID, ttID, name, description, creatorEmail) {
    if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail})) {
      if (!(await this.taskClass.getTaskByFilter({_id: taskID}))) {
        throw new Error('No task with this id');
      }
      try {
        return await this.taskClass.changeTaskByFilter({_id: taskID, timeTableID: ttID}, {
          name, description
        });
      } catch {
        throw new Error('DB error')
      }
    }

    throw new Error('Incorrect task or timetable')

  }


}





