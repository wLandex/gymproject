const Joi = require("joi");
const tasks = require("../../entities/classes/task.js");
const timeTable = require("../../entities/classes/timeTable.js");
const validatationSchemas = require("../../validationSchemas.js");

const timeTableController = {
  async getAll(req, res) {
    try {
      let result = await timeTable.getTimetables();
      if (result.length) {
        res.json(result);
        return;
      }
      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  },
  async delete(req, res) {
    try {
      await timeTable.removeTimeTables({});
      await tasks.removeTasks({});
      res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  },
  async getByID(req, res) {
    //Checking for validation
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
  },

  async create(req, res) {
    //Checking for validation
    try {
      let addedTimetable = await timeTable.addTimetable({
        name: req.body.name,
      });
      res.status(201).json(addedTimetable);
    } catch (e) {
      res.sendStatus(500);
    }
  },

  async deleteByID(req, res) {
    //Checking for validation
    try {
      Joi.attempt({ id: req.params.ttID }, validatationSchemas.idSchema);

      try {
        let result = await timeTable.getTimetableByID(req.params.ttID);
        if (!result) {
          console.log(result, "----result");
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
};

module.exports = timeTableController;
