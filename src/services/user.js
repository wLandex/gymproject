const {createHmac} = require('crypto');
const randToken = require('rand-token');

module.exports = class User {
  constructor(userClass, sessionClass) {
    this.userClass = userClass;
    this.sessionClass = sessionClass;
  }

  async create(email, password) {
    //Заходим в коллекцию Users и проверяем есть ли Users с Email === userEmail
    if (await this.userClass.getUserByEmail(email))
      throw new Error('This email already exists')
    //Хешируем пароль
    const hash = createHmac('sha256', process.env.SECRET)
        .update(password)
        .digest('hex');

    //Сохраняем нового пользователя в базу данных
    await this.userClass.create(email, hash);
  }

  async login(email, password) {


    let foundUser = await this.userClass.getUserByEmail(email)
    if (!foundUser) throw new Error('No user with such email');
    const hash = createHmac('sha256', process.env.SECRET)
        .update(password)
        .digest('hex');

    if (foundUser.hashPassword !== hash) throw new Error('Wrong password');

    let expireAtAccessToken = Date.now() + 120e3;
    let expireAtRefreshToken = Date.now() + 7200e3;
    let accessToken = randToken.generate(32);
    let refreshToken = randToken.generate(32);


    let createdSession = await this.sessionClass.create(foundUser._id, accessToken, refreshToken, expireAtAccessToken, expireAtRefreshToken);

    let result = createdSession[0];
    return {
      refreshToken: result.refreshToken,
      accessToken: result.accessToken,
      expireAtAccessToken: result.expireAtAccessToken,
    }

  }

}





