const userController = require("../controllers/user.js");
const validationSchemas = require("../../validationSchemas.js");
import validator from "../middleWares/validator";


module.exports = function (router) {

  router.post(
      "/user",
      validator({


        body: {
          email: validationSchemas.emailSchema,
          password: validationSchemas.passwordSchema
        }
      }),
      userController.create
  );

  router.get(
      "/user",
      validator({

        body: {
          email: validationSchemas.emailSchema,
          password: validationSchemas.passwordSchema,
        }


      }),
      userController.login
  );


};
