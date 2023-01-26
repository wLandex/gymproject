const Joi = require("Joi");

module.exports = function (schema) {
  return (req, res, next) => {
    if (schema.body) {
      try {
        Joi.attempt(req.body, schema.body);
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid body", message: e.message });
      }
    }
    if (schema.params) {
      try {
        Joi.attempt(req.params, schema.params);
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid params", message: e.message });
      }
    }
    next();
  };
};
