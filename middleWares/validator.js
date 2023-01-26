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
      console.log("he");
      try {
        Joi.attempt({ id: req.params.ttID }, schema.params);
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid params", message: e.message });
      }
    }
    if (schema.params2) {
      try {
        Joi.attempt({ id: req.params.ttID }, schema.params2);
        Joi.attempt({ id: req.params.taskID }, schema.params2);
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid params", message: e.message });
      }
    }

    next();
  };
};
