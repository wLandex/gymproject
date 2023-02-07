const TaskService = require("../../services/task");
const TimeTableMock = require("../units/mocks/entities/classes/timeTableMock");
const TaskMock = require("../units/mocks/entities/classes/taskMock");
const TimeTableService = require("../../services/timeTable");


module.exports = function initializeServices() {
  const ttMock = new TimeTableMock();
  const taskMock = new TaskMock();
  const taskService = new TaskService(ttMock, taskMock);
  const timeTableService = new TimeTableService(ttMock, taskMock);

  return {taskService, timeTableService}
}