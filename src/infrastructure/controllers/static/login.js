const pug = require('pug');
const compiledFunction = pug.compileFile("./templates/login.pug");


const loginController = {
  async login(req, res) {
    let result = compiledFunction({pageName: "Авторизация"})
    res.send(result);

  }

}
module.exports = loginController