const tasks = require("../../entities/classes/task.js");
const timeTable = require("../../entities/classes/timeTable.js");
const service = require("../../services/task.js");




const taskController = {
  async getTasks(req, res) {
    //Checking for validation

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
  },

  async deleteTasks(req, res) {

      try {
        await tasks.removeTasks({
          timeTableID: req.params.ttID,
        });
        res.sendStatus(200);
      } catch {
        res.sendStatus(500);
      }
  },

  async createTask(req, res) {
      try {

          try{
              const result =  await  service.createTask({ttID: req.params.ttID, description: req.body.description, name: req.body.name, date:req.body.date})
              res.status(200).json(result);
          }
        catch(e){
              res.status(400).json({message: e.message});
        }

      } catch {
        res.sendStatus(500);
      }
  },
  async getTaskByID(req, res) {
    //FIX when trying to pass 63d0306905151a3266473a3y validation dont work because of last symbol.

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

  },

  async deleteTaskByID(req, res) {

      try {
        const deletedTask = await tasks.removeTaskByID(req.params.taskID);
        res.json(deletedTask);
      } catch {
        res.sendStatus(500);
      }
  },
  async changeTaskByID(req, res) {
      try {
        if (!(await tasks.getTaskByID(req.params.taskID))) {
          res.sendStatus(400);
          return;
        }
        const changedTask = await tasks.changeTask(req.params.taskID, {
          name: req.body.name,
          description: req.body.description,
        });
        res.send(changedTask);
      } catch {
        res.sendStatus(500);
      }
  },
};

module.exports = taskController;
