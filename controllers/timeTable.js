const Joi = require("joi");
const tasks = require("../classes/task.js");
const timeTable = require("../classes/timeTable.js");
const validatationSchemas = require("../validationSchemas.js");

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
    //Checking for validation
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);

      try {
        let result = await timeTable.getTimetableByID(req.params.ttID);
        if (!result) {
          res.sendStatus(404);
          return;
        }
        res.json(result);
      } catch (e) {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },

  async create(req, res) {
    //Checking for validation
    try {
      Joi.attempt({ name: req.body.name }, validatationSchemas.nameSchema);
      try {
        let addedTimetable = await timeTable.addTimetable({
          name: req.body.name,
        });
        res.status(201).json(addedTimetable);
      } catch (e) {
        res.sendStatus(500);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  async deleteByID(req, res) {
    //Checking for validation
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);

      try {
        let result = await timeTable.getTimetableByID(req.params.ttID);
        if (!result) {
          res.sendStatus(404);
          return;
        }
        try {
          let deletedTimeTablesInfo = await timeTable.removeTimetableByID(
            req.params.ttID
          );
          let deletedTasksInfo = await tasks.removeTasks({
            timeTableID: req.params.ttID,
          });
          res.status(200).json([
            { about: "DeletedTimeTables", ...deletedTimeTablesInfo },
            { about: "DeletedTasks", ...deletedTasksInfo },
          ]);
        } catch {
          res.sendStatus(500);
        }
      } catch {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },

  async getTasks(req, res) {
    //Checking for validation
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);
      try {
        let result = await tasks.getTasks({ timeTableID: req.params.ttID });
        if (!result.length) {
          res.sendStatus(204);
          return;
        }
        res.json(result);
      } catch {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },

  async deleteTasks(req, res) {
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);
      try {
        await tasks.removeTasks({
          timeTableID: req.params.ttID,
        });
        res.sendStatus(200);
      } catch {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },

  async createTask(req, res) {
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);
      Joi.attempt(
        { name: req.body.name, description: req.body.description },
        validatationSchemas.nameDescSchema
      );
      try {
        if (await timeTable.getTimetableByID(req.params.ttID)) {
          let result = await tasks.addTask({
            name: req.body.name,
            description: req.body.description,
            timeTableID: req.params.ttID,
          });
          console.log(result);
          res.status(200).json(result);
        } else {
          res.sendStatus(400);
          return;
        }
      } catch {
        res.send(500);
      }
    } catch {
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
