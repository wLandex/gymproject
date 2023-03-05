const loginController = require('../../controllers/static/login.js');

module.exports = function (router) {

  router.get(
      "/login", loginController.login
  );

};