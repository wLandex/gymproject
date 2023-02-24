const userController = require("../controllers/user.js");
const validationSchemas = require("../../validationSchemas.js");
import validator from "../middleWares/validator";


module.exports = function (router) {

  router.post(
      "/user",
      validator({
        body: validationSchemas.emailPasswordSchema
      }),
      userController.create
  );

  router.get(
      "/user",
      validator({
        body: validationSchemas.emailPasswordSchema
      }),
      userController.login
  );


};
