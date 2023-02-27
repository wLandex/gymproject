const SessionCollection = require('../../entities/classes/session.js');

module.exports = function () {
  return async function (req, res, next) {
    try {
      let accessToken = req.body.accessToken;
      let result = await SessionCollection.findByAccessToken(accessToken);

      console.log(result);
      if (!result) {
        return res.status(404).json({message: "No such token"});
      }

      if (!(result.expireAtAccessToken > Date.now())) {
        return res.status(401).json({message: "Access token expired"});

      }

      req.data = {
        userID: result.userID,
        userEmail: result.userEmail
      };

    } catch (e) {
      return res.status(500).json({message: e.message})
    }

    next();
  }

}