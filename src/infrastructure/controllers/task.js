const tasks = require("../../entities/classes/task.js");
const timeTable = require("../../entities/classes/timeTable.js");
const ServiceTask = require("../../services/task.js");
const service = new ServiceTask(timeTable, tasks)


const taskController = {
  async getTasks(req, res) {

    try {
      let result = await service.getTasks(req.params.ttID, Number(req.query.limit), Number(req.query.page), req.data.userEmail);
      if (!result.length) {
        res.sendStatus(204);
        return;
      }
      res.json(result);
    } catch {
      res.sendStatus(500);
    }
  },

  async createTask(req, res) {

    try {
      const result = await service.create({
        ttID: req.params.ttID,
        description: req.body.description,
        name: req.body.name,
      }, req.data.userEmail)
      res.status(200).json(result);
    } catch (e) {
      if (e.message === 'Cannot find timetable') {
        res.status(404).json({message: e.message});
        return;
      }
      res.status(500).json({message123: e.message});
    }
  },
  async getTaskByID(req, res) {
    try {
      let result = await service.getTaskByID(req.params.ttID, req.params.taskID, req.data.userEmail);
      console.log(result)
      res.json(result);
    } catch (e) {
      if (e.message === 'DB error') {
        res.status(500).json({message: e.message});
        return;
      }
      res.status(400).json({message: e.message})
    }

  },

  async deleteTaskByID(req, res) {

    try {
      const deletedTask = await service.deleteTaskByID(req.params.taskID, req.params.ttID, req.data.userEmail);
      res.json(deletedTask);
    } catch {
      res.sendStatus(500);
    }
  },
  async changeTaskByID(req, res) {
    try {
      const changedTask = await service.changeTaskByID(req.params.taskID, req.params.ttID, req.body.name, req.body.description, req.data.userEmail)
      res.send(changedTask);
    } catch (e) {
      if (e.message === 'DB error') {
        res.status(500).json({message: e.message});
        return;
      }
      res.status(400).json({message: e.message});

    }

  }
};

module.exports = taskController;
