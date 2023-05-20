import Joi from "joi";

const validationSchemas = {

  idSchema: Joi.string().min(24).max(24).alphanum().required(),

  dateSchema: Joi.date().iso().greater("12-12-2020"),

  descriptionSchema: Joi.string().min(6).max(50).required(),

  nameSchema: Joi.string().min(6).max(25).required(),

  limitSchema: Joi.string().pattern(/^[0-9]+$/).max(30).required(),

  pageSchema: Joi.string().pattern(/^[0-9]+$/).min(1).required(),

  emailSchema: Joi.string().email().required(),

  passwordSchema: Joi.string().min(8).max(26).required(),

  tokenSchema: Joi.string().min(32).max(32).required(),

  isUsed: Joi.boolean().required()


};

module.exports = validationSchemas;
