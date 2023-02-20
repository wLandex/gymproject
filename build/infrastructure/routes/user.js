"use strict";
const validator = require("../middleWares/validator.js");
const userController = require("../controllers/user.js");
const validationSchemas = require("../../validationSchemas.js");
module.exports = function (router) {
    router.post("/user", validator({
        body: validationSchemas.emailPasswordSchema
    }), userController.create);
    router.get("/user", validator({
        body: validationSchemas.emailPasswordSchema
    }), userController.login);
};
