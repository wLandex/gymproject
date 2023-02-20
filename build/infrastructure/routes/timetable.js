"use strict";
const validator = require("../middleWares/validator.js");
const timeTableController = require("../controllers/timeTable.js");
const validationSchemas = require("../../validationSchemas.js");
module.exports = function (router) {
    router.get("/timetables", timeTableController.getAll);
    router.post("/timetables", validator({ body: validationSchemas.nameSchema }), timeTableController.create);
    router.delete("/timetables", timeTableController.delete);
    router.get("/timetables/:ttID", validator({ params: { ttID: validationSchemas.idSchema } }), timeTableController.getByID);
    router.delete("/timetables/:ttID", validator({ params: { ttID: validationSchemas.idSchema } }), timeTableController.deleteByID);
};
