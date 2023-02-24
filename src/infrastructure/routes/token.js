import validator from "../middleWares/validator";

const tokenController = require("../controllers/token.js");
const validationSchemas = require("../../validationSchemas.js");

module.exports = function (router) {

  router.post(
      "/tokens/refresh",
      validator({
        body: validationSchemas.tokenSchema
      }),
      tokenController.refresh
  );


};
