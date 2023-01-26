const express = require("express");
const timeTableController = require("../controllers/timeTable.js");
const taskController = require("../controllers/task.js");

module.exports = function (router) {
  router.delete("/timetables/:ttID/tasks", taskController.deleteTasks);

  router.post("/timetables/:ttID/tasks", taskController.createTask);

  router.get("/timetables/:ttID/tasks", taskController.getTasks);

  router.get("/timetables/:ttID/tasks/:taskID", taskController.getTaskByID);

  router.delete(
    "/timetables/:ttID/tasks/:taskID",
    taskController.deleteTaskByID
  );
  //FIX
  router.put("/timetables/:ttID/tasks/:taskID", taskController.changeTaskByID);
};
