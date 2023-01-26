const validator = require("../middleWares/validator.js");
const taskController = require("../controllers/task.js");
const validationSchemas = require("../validationSchemas.js");

module.exports = function (router) {
  router.delete(
    "/timetables/:ttID/tasks",
    validator({ params: validationSchemas.idSchema })
  );

  router.post(
    "/timetables/:ttID/tasks",
    validator({
      body: validationSchemas.nameDescSchema,
      params: validationSchemas.idSchema,
    }),
    taskController.createTask
  );

  router.get(
    "/timetables/:ttID/tasks",
    validator({ params: validationSchemas.idSchema }),
    taskController.getTasks
  );

  router.get(
    "/timetables/:ttID/tasks/:taskID",
    validator({ params2: validationSchemas.idSchema }),
    taskController.getTaskByID
  );

  router.delete(
    "/timetables/:ttID/tasks/:taskID",
    validator({ params2: validationSchemas.idSchema }),
    taskController.deleteTaskByID
  );
  //FIX
  router.put(
    "/timetables/:ttID/tasks/:taskID",
    validator({
      params2: validationSchemas.idSchema,
      body: validationSchemas.nameDescSchema,
    }),
    taskController.changeTaskByID
  );
};
