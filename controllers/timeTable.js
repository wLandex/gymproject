const tasks = require("../classes/task.js");
const timeTable = require("../classes/timeTable.js");

const timeTableController = {
  async getAll(req, res) {
    try {
      res.json(await timeTable.getTimetables());
    } catch {
      res.sendStatus(204);
    }
  },
  async delete(req, res) {
    try {
      if (await timeTable.getTimetable()) {
        await timeTable.removeTasks({});
        await tasks.removeTasks({});
        res.sendStatus(200);
        return;
      }
      res.sendStatus(204);
      return;
    } catch {
      res.sendStatus(204);
    }
  },
  async getByID(req, res) {
    try {
      let result = await timeTable.getTimetableByID(req.params.ttID);
      res.json(result);
    } catch {
      res.sendStatus(400);
    }
  },

  async create(req, res) {
    try {
      let addedTimetable = await timeTable.addTimetable({
        name: req.body.name,
      });

      res.json(addedTimetable);
    } catch {
      res.sendStatus(400);
    }
  },

  async deleteByID(req, res) {
    try {
      console.log(req.params.id);
      await timeTable.removeTimetableByID(req.params.ttID);
      //BUG
      await tasks.removeTasks({ timeTableID: req.params.ttID });
      res.sendStatus(200);
    } catch {
      res.sendStatus(400);
    }
  },

  async getTasks(req, res) {
    if (await timeTable.getTimetableByID(req.params.ttID)) {
      try {
        console.log(req.params.ttID);
        res.send(await tasks.getTasks({ timeTableID: req.params.ttID }));
        return;
      } catch {
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(400);
    }
  },

  async deleteTasks(req, res) {
    if (await timeTable.getTimetableByID(req.params.ttID)) {
      try {
        await tasks.removeTasks({ timeTableID: req.params.ttID });
        res.sendStatus(200);
      } catch {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(400);
    }
  },

  async createTasks(req, res) {
    if (await timeTable.getTimetableByID(req.params.ttID)) {
      if (req.body.name && req.body.description) {
        await tasks.addTask({
          name: req.body.name,
          description: req.body.description,
          timeTableID: req.params.ttID,
        });
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(400);
    }
  },
  async getTaskByID(req, res) {
    if (await timeTable.getTimetableByID(req.params.ttID)) {
      try {
        res.json(await tasks.getTaskByID(req.params.taskID));
      } catch {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  },

  async deleteTaskByID(req, res) {
    if (await timeTable.getTimetableByID(req.params.ttID)) {
      await tasks.removeTaskByID(req.params.taskID);
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  },
  async changeTaskByID(req, res) {
    if (
      (await timeTable.getTimetableByID(req.params.ttID)) &&
      (await tasks.getTasks({ _id: req.params.taskID })).length > 0
    ) {
      await tasks.changeTask(req.params.taskID, {
        name: req.body.name,
        description: req.body.description,
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  },
};

module.exports = timeTableController;
