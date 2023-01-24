const Joi = require("joi");

const validatationSchemas = {
  idSchema: Joi.object({
    id: Joi.string().min(24).max(24).required().alphanum(),
  }),

  namedesSchema: Joi.object({
    name: Joi.string().min(6).max(30).alphanum().required(),
    description: Joi.string().min(6).alphanum().required().max(50),
  }),
};

module.exports = validatationSchemas;
