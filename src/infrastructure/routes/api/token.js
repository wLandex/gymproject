import validator from "../../middleWares/validator";

const tokenController = require("../../controllers/api/token.js");
const validationSchemas = require("../../../validationSchemas.js");

module.exports = function (router) {

  router.post(
      "/tokens/refresh",
      validator({
        body: {refreshToken: validationSchemas.tokenSchema}
      }),
      tokenController.refresh
  );


};
