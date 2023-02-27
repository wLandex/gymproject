const sessionClass = require("../../entities/classes/session.js");

const ServiceUser = require("../../services/token");
const service = new ServiceUser(sessionClass);

const tokenController = {


  async refresh(req, res) {
    try {

      let result = await service.refresh(req.body.refreshToken);
      res.status(200).json(result);

    } catch (e) {
      if (e.message === 'No such session') {
        return res.status(400).json({message: e.message});

      }

      if (e.message === 'Refresh Token Expired') {
        return res.status(403).json({message: e.message});

      }


      res.status(500).json({message: e.message});
    }
  }
};

module.exports = tokenController;