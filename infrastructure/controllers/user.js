const userClass = require("../../entities/classes/user.js");
const ServiceUser = require("../../services/user.js");
const service = new ServiceUser(userClass);

const userController = {

  async create(req, res) {
    try {
      await service.create(req.body.email, req.body.password);
      res.sendStatus(201);
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  },

  async login(req, res) {
    try {
      await service.login(req.body.email, req.body.password);
      res.status(200).json({message: "Logged IN"})

    } catch (e) {
      if (e.message === "No user with such email") {
        res.sendStatus(400);
        return
      }
      if (e.message === "Wrong password") {
        res.sendStatus(401);
        return
      }
      res.status(500).json({message: e.message});
    }
  }
};

module.exports = userController;