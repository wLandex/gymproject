const Joi = require("joi");

const validationSchemas = {
  idSchema: Joi.string().min(24).max(24).alphanum().required(),

  nameDescSchema: {
    date: Joi.date().iso().greater("12-12-2020"),
    name: Joi.string().min(6).max(25).required(),
    description: Joi.string().min(6).max(50).required(),
  },

  nameSchema: {
    name: Joi.string().min(6).max(25).required(),
  },

  limitPageSchema: {
    limit: Joi.string().pattern(/^[0-9]+$/).max(30).required(),
    page: Joi.string().pattern(/^[0-9]+$/).min(1).required()
  },

  emailPasswordSchema: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(26).required(),
  
  }
};

module.exports = validationSchemas;
