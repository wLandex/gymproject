import validator from "../../middleWares/validator";

const authentication = require('../../middleWares/authentication.js');
const timeTableController = require("../../controllers/api/timeTable.js");
const validationSchemas = require("../../../validationSchemas.js");

module.exports = function (router) {

  router.get("/timetables", validator({
    authenticationToken: {
      accessToken: validationSchemas.tokenSchema
    }
  }), authentication(), timeTableController.getAll);

  router.post(
      "/timetables",
      validator({
            body: {
              name: validationSchemas.nameSchema
            },
            authenticationToken: {
              accessToken: validationSchemas.tokenSchema
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
        authenticationToken: {
          accessToken: validationSchemas.tokenSchema
        }
      }),
      timeTableController.getByID,
  );

  router.delete(
      "/timetables/:ttID",
      validator({
        params: {ttID: validationSchemas.idSchema},
        authenticationToken: {
          accessToken: validationSchemas.tokenSchema
        }
      }), authentication(),
      timeTableController.deleteByID
  );
};
