const validator = require("../middleWares/validator.js");
const timeTableController = require("../controllers/timeTable.js");
const validatationSchemas = require("../validationSchemas.js");

module.exports = function (router) {
  router.get("/timetables", timeTableController.getAll);

  router.post(
    "/timetables",
    validator({ body: validatationSchemas.nameSchema }),
    timeTableController.create
  );

  router.delete("/timetables", timeTableController.delete);

  router.get(
    "/timetables/:ttID",
    validator({ params: validatationSchemas.idSchema }),
    timeTableController.getByID
  );

  router.delete("/timetables/:ttID", timeTableController.deleteByID);
};
