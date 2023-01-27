const timeTable = require("../entities/classes/timeTable");
const tasks = require("../entities/classes/task");

module.exports = {
  async getTasks(ttID) {
    try {
      return await tasks.getTasks({timeTableID: ttID})
    } catch {
      throw new Error('DB error');
    }

  },

  async deleteTasks(ttID) {
    try {
      await tasks.removeTasks({
        timeTableID: ttID
      });
    } catch {
      throw new Error('DB error');
    }

  },

  async createTask(data) {
    const {ttID, description, name, date} = data;
    try {
      if (await timeTable.getTimetableByID(ttID)) {
        let result;

        if (date) {
          result = await tasks.addTask({
            name,
            description,
            timeTableID: ttID,
            date,
          });
        } else {
          result = await tasks.addTask({
            name,
            description: description,
            timeTableID: ttID,
          });
        }
        return result;

      }
    } catch {
      throw new Error('DB error')
    }

    throw new Error('Cannot find timetable');
  },

  async getTaskByID(ttID, taskID) {
    try {
      if
      (await timeTable.getTimetableByID(ttID) &&
          (await tasks.getTaskByID(taskID))
      ) {
        return await tasks.getTaskByID(taskID);
      }
    } catch {
      throw new Error('DB error');
    }
    throw new Error('Incorrect task or timetable')
  },

  async deleteTaskByID(taskID) {
    try {
      return await tasks.removeTaskByID(taskID);

    } catch {
      throw new Error('DB error')
    }
  },
  // Might need to add finding if timetable with some ttID exist.
  async changeTaskByID(taskID, name, description) {
    if (!(await tasks.getTaskByID(taskID))) {
      throw new Error('No task with this id');
    }
    try {
      return await tasks.changeTask(taskID, {
        name, description
      });
    } catch {
      throw new Error('DB error')
    }
  }

}





