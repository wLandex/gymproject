const tasks = require("../../../entities/classes/task.js");
const timeTable = require("../../../entities/classes/timeTable.js");

const ServiceTimeTable = require("../../../services/timeTable.js");
const service = new ServiceTimeTable(timeTable, tasks)

const timeTableController = {

  async getAll(req, res) {
    try {
      let result = await service.getAll(req.data.userEmail);
      if (result.length) {
        res.json(result);
        return;
      }
      res.sendStatus(204);
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  },

  async deleteByID(req, res) {
    try {
      let result = await service.deleteByID(req.params.ttID, req.data.userEmail)
      res.json(result);

    } catch (e) {
      if (e.message === 'No such timetable') {
        res.status(404).json({message: e.message});
        return
      }
      res.status(500).json({message: e.message});
    }
  },

  async getByID(req, res) {
    try {
      let result = await service.getByID(req.params.ttID, req.data.userEmail);
      if (!result) {
        res.sendStatus(404);
        return;
      }
      res.json(result);
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  },

  async create(req, res) {
    try {
      let addedTimetable = await service.create(req.body.name, req.data.userEmail);
      res.status(201).json(addedTimetable);
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  },


};

module.exports = timeTableController;
