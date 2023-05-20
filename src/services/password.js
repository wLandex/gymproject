const SECOND = 1000;
const MINUTE = SECOND * 60;


module.exports = class User {
  constructor(userClass, recoveryPasswordClass, mailSystemClass) {
    this.userClass = userClass;
    this.recoveryPasswordClass = recoveryPasswordClass;
    this.mailSystemClass = mailSystemClass;
  }

  async recoveryLink(email) {
    //Заходим в коллекцию Users и проверяем есть ли Users с Email === userEmail
    if (!await this.userClass.getUserByEmail(email))
      throw new Error("No such email");

    let recoveryToken = await this.recoveryPasswordClass.generateToken();

    let expireAt = Date.now() + 2 * MINUTE;

    return await this.recoveryPasswordClass.create(email, recoveryToken, expireAt);

  }

  async sendEmail(sendTo, recoveryToken) {
    await this.mailSystemClass.sendEmail(sendTo, recoveryToken);

  }

};
