const userClass = require("../../../entities/classes/user.js");
const recoveryPasswordClass = require("../../../entities/classes/password.js");
const mailSystemClass = require("../../../entities/classes/mailSystem.js")


const ServicePassword = require("../../../services/password.js");
const service = new ServicePassword(userClass, recoveryPasswordClass, mailSystemClass);

const passwordController = {

  async recoveryLink(req, res) {
    try {
      let createdEntity = await service.recoveryLink(req.body.email);
      console.log(createdEntity)
      await service.sendEmail(req.body.email, createdEntity[0].recoveryToken)
      res.sendStatus(201);
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  },

};

module.exports = passwordController