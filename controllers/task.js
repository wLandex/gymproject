const Joi = require("joi");
const tasks = require("../classes/task.js");
const timeTable = require("../classes/timeTable.js");
const validatationSchemas = require("../validationSchemas.js");

const timeTableController = {
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

          res.status(200).json(result);
        } else {
          res.sendStatus(400);
          return;
        }
      } catch {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },
  async getTaskByID(req, res) {
    //FIX when trying to pass 63d0306905151a3266473a3y validation dont work because of last symbol.
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);
      Joi.attempt({ id: req.params.taskID }, validatationSchemas.idSchema);
      try {
        if (
          (await timeTable.getTimetableByID(req.params.ttID)) &&
          (await tasks.getTaskByID(req.params.taskID))
        ) {
          let result = await tasks.getTaskByID(req.params.taskID);
          res.json(result);
        } else {
          res.sendStatus(400);
        }
      } catch (e) {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },

  async deleteTaskByID(req, res) {
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);
      Joi.attempt({ id: req.params.taskID }, validatationSchemas.idSchema);
      try {
        const deletedTask = await tasks.removeTaskByID(req.params.taskID);
        res.json(deletedTask);
      } catch {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },
  async changeTaskByID(req, res) {
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);
      Joi.attempt({ id: req.params.taskID }, validatationSchemas.idSchema);
      Joi.attempt(
        { name: req.body.name, description: req.body.description },
        validatationSchemas.nameDescSchema
      );
      try {
        if (!(await tasks.getTaskByID(req.params.taskID))) {
          res.sendStatus(400);
          return;
        }
        const changedTask = await tasks.changeTask(req.params.taskID, {
          name: req.body.name,
          description: req.body.description,
        });
      } catch {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(400);
    }
  },
};

module.exports = timeTableController;
