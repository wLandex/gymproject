const Joi = require("joi");

const validatationSchemas = {
  idSchema: Joi.object({
    id: Joi.string().min(24).max(24).alphanum().required(),
  }),

  nameDescSchema: Joi.object({
    name: Joi.string().min(6).max(25).required(),
    description: Joi.string().min(6).max(50).required(),
  }),

  nameSchema: Joi.object({
    name: Joi.string().min(6).max(25).required(),
  }),
};

module.exports = validatationSchemas;
