import Joi from "joi";

const validationSchemas = {
  idSchema: Joi.string().min(24).max(24).alphanum().required(),

  // nameDescSchema: {
  //   date: Joi.date().iso().greater("12-12-2020"),
  //   name: Joi.string().min(6).max(25).required(),
  //   description: Joi.string().min(6).max(50).required(),
  // },


  dateSchema: Joi.date().iso().greater("12-12-2020"),
  descriptionSchema: Joi.string().min(6).max(50).required(),


  nameSchema: Joi.string().min(6).max(25).required(),

  // limitPageSchema: {
  //   limit: Joi.string().pattern(/^[0-9]+$/).max(30).required(),
  //   page: Joi.string().pattern(/^[0-9]+$/).min(1).required()
  // },

  limitSchema: Joi.string().pattern(/^[0-9]+$/).max(30).required(),
  pageSchema: Joi.string().pattern(/^[0-9]+$/).min(1).required(),

  // emailPasswordSchema: {
  //   email: Joi.string().email().required(),
  //   password: Joi.string().min(8).max(26).required(),
  // },

  emailSchema: Joi.string().email().required(),
  passwordSchema: Joi.string().min(8).max(26).required(),


  // refreshTokenSchema: Joi.string().min(32).max(32),

  tokenSchema: Joi.string().min(32).max(32).required()


};

module.exports = validationSchemas;
