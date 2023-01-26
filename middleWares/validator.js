const Joi = require("Joi");

module.exports = function (schema) {
  return (req, res, next) => {
    if (schema.body) {
      try {
        if (req.body.date) {
          req.body.date = new Date(req.body.date);
          console.log(req.body);
        }

        Joi.attempt(req.body, schema.body);
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid body ", message: e.message });
      }
    }
    if (schema.params) {
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

    // if (schema.date && req.body.date) {
    //   try {
    //     console.log("hey");
    //     let date = new Date(req.body.date);
    //     console.log(date);
    //     Joi.attempt({ date }, schema.date);
    //   } catch (e) {
    //     return res
    //       .status(400)
    //       .json({ reason: "Invalid date", message: e.message });
    //   }
    // }

    next();
  };
};
