import validator from "../../middleWares/validator";

const authentication = require('../../middleWares/authentication.js');
const timeTableController = require("../../controllers/api/timeTable.js");
const validationSchemas = require("../../../validationSchemas.js");

module.exports = function (router) {

  router.get("/timetables", validator({
    body: {
      accessToken: validationSchemas.tokenSchema
    }
  }), authentication(), timeTableController.getAll);

  router.post(
      "/timetables",
      validator({
            body: {
              accessToken: validationSchemas.tokenSchema,
              name: validationSchemas.nameSchema
            }
          }
      ),
      authentication(),
      timeTableController.create
  );

  router.get(
      "/timetables/:ttID",
      validator({
        params: {ttID: validationSchemas.idSchema},
        body: {accessToken: validationSchemas.tokenSchema}
      }),
      timeTableController.getByID,
  );

  router.delete(
      "/timetables/:ttID",
      validator({
        params: {ttID: validationSchemas.idSchema},
        body: {accessToken: validationSchemas.tokenSchema}
      }), authentication(),
      timeTableController.deleteByID
  );
};
