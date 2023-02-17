const validator = require("../middleWares/validator.js");
const taskController = require("../controllers/task.js");
const validationSchemas = require("../../validationSchemas.js");

module.exports = function (router) {
  router.delete(
      "/timetables/:ttID/tasks",
      validator({params: {ttID: validationSchemas.idSchema}}),
      taskController.deleteTasks
  );

  router.post(
      "/timetables/:ttID/tasks",
      validator({
        body: validationSchemas.nameDescSchema,
        params: {ttID: validationSchemas.idSchema},
      }),
      taskController.createTask
  );

  router.get(
      "/timetables/:ttID/tasks",
      validator({
        params: {ttID: validationSchemas.idSchema},
        query: validationSchemas.limitPageSchema

      }),
      taskController.getTasks
  );

  router.get(
      "/timetables/:ttID/tasks/:taskID",
      validator({
        params: {
          ttID: validationSchemas.idSchema,
          taskID: validationSchemas.idSchema,

        },
      }),

      taskController.getTaskByID
  );

  router.delete(
      "/timetables/:ttID/tasks/:taskID",
      validator({
        params: {
          ttID: validationSchemas.idSchema,
          taskID: validationSchemas.idSchema,
        },
      }),
      taskController.deleteTaskByID
  );
  //FIX
  router.put(
      "/timetables/:ttID/tasks/:taskID",
      validator({
        params: {
          ttID: validationSchemas.idSchema,
          taskID: validationSchemas.idSchema,
        },
        body: validationSchemas.nameDescSchema,
      }),
      taskController.changeTaskByID
  );
};
