const passwordController = require("../../controllers/api/password.js");
const validationSchemas = require("../../../validationSchemas.js");
import validator from "../../middleWares/validator";


module.exports = function (router) {

  router.post(
      "/password/recovery-link",
      validator({
        body: {
          email: validationSchemas.emailSchema,
        }
      }),
      passwordController.recoveryLink
  );

};
