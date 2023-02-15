const {createHmac} = require('crypto');

module.exports = class User {
  constructor(userClass) {
    this.userClass = userClass;
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
    await this.userClass.add(email, hash);
  }

  async login(email, password) {
    let foundUser = await this.userClass.getUserByEmail(email)
    console.log(foundUser);
    if (!foundUser) throw new Error('No user with such email');
    const hash = createHmac('sha256', process.env.SECRET)
        .update(password)
        .digest('hex');

    if (foundUser.hashPassword !== hash) throw new Error('Wrong password');

  }

}





