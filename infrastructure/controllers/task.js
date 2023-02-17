const tasks = require("../../entities/classes/task.js");
const timeTable = require("../../entities/classes/timeTable.js");
const ServiceTask = require("../../services/task.js");
const service = new ServiceTask(timeTable, tasks)


const taskController = {
  async getTasks(req, res) {

    try {
      let result = await service.getTasks(req.params.ttID, Number(req.query.limit), Number(req.query.page));
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
      await service.deleteTasks(req.params.ttID);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  },

  async createTask(req, res) {

    try {
      const result = await service.create({
        ttID: req.params.ttID,
        description: req.body.description,
        name: req.body.name,
        date: req.body.date
      })
      res.status(200).json(result);
    } catch (e) {
      if (e.message === 'Cannot find timetable') {
        res.status(404).json({message: e.message});
        return;
      }
      res.status(500).json({message: e.message});
    }
  },
  async getTaskByID(req, res) {
    //FIX when trying to pass 63d0306905151a3266473a3y validation dont work because of last symbol.
    try {
      let result = await service.getTaskByID(req.params.ttID, req.params.taskID);
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
      const deletedTask = await service.deleteTaskByID(req.params.taskID);
      res.json(deletedTask);
    } catch {
      res.sendStatus(500);
    }
  },
  async changeTaskByID(req, res) {
    try {
      const changedTask = await service.changeTaskByID(req.params.taskID, req.body.name, req.body.description)
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
