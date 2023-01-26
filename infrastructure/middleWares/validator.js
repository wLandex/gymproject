const Joi = require("Joi");

module.exports = function (schema) {
  return (req, res, next) => {
    if (schema.body) {
      try {
        // if (req.body.date) {
        //   req.body.date = new Date(req.body.date);
        //   console.log(req.body);
        // }

       req.body = Joi.attempt(req.body, Joi.object(schema.body));
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid body ", message: e.message });
      }
    }
    if (schema.params) {
      try {
        req.params = Joi.attempt(req.params, Joi.object(schema.params));
      } catch (e) {
        return res
          .status(400)
          .json({ reason: "Invalid params", message: e.message });
      }
    }



    next();
  };
};
