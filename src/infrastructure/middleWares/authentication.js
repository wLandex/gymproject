const SessionCollection = require('../../entities/classes/session.js');

module.exports = function () {
  return async function (req, res, next) {
    try {
      let accessToken = req.headers.accesstoken;
      console.log(accessToken)
      let result = await SessionCollection.findByAccessToken(accessToken);

      if (!result) {
        return res.status(401).json({message: "No such token"});
      }

      if (result.expireAtAccessToken.getTime() < Date.now()) {
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