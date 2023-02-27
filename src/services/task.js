module.exports = class Task {
  constructor(timeTableClass, taskClass) {
    this.timeTableClass = timeTableClass;
    this.taskClass = taskClass;

  }

  async getTasks(ttID, limit, page, userEmail) {
    if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail: userEmail})) {
      try {
        return await this.taskClass.getTasks({timeTableID: ttID}, limit, page)
      } catch {
        throw new Error('DB error');
      }

    }
    throw new Error('Incorrect task or timetable')

  }

  async create(data, userEmail) {
    const {ttID, description, name} = data;
    try {
      if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail: userEmail})) {
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

  async getTaskByID(ttID, taskID, userEmail) {
    try {
      if
      (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail: userEmail}) &&
          (await this.taskClass.getTaskByFilter({_id: taskID, timeTableID: ttID}))
      ) {
        return await this.taskClass.getTaskByFilter({_id: taskID, timeTableID: ttID});
      }
    } catch {
      throw new Error('DB error');
    }
    throw new Error('Incorrect task or timetable')
  }

  async deleteTaskByID(taskID, ttID, userEmail) {
    if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail: userEmail})) {
      try {
        return await this.taskClass.removeTaskByFilter({_id: taskID, timeTableID: ttID});

      } catch {
        throw new Error('DB error')
      }

    }
    throw new Error('Incorrect task or timetable')
  }

  // Might need to add finding if timetable with some ttID exist.
  async changeTaskByID(taskID, ttID, name, description, userEmail) {
    if (await this.timeTableClass.getTimetableByID({_id: ttID, creatorEmail: userEmail})) {
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





