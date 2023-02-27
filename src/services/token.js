const {createHmac} = require('crypto');
const randToken = require('rand-token');

module.exports = class User {
  constructor(sessionClass) {
    this.sessionClass = sessionClass;
  }

  async refresh(refToken) {
    let foundSession = await this.sessionClass.findByRefreshToken(refToken)

    if (!foundSession) {
      throw new Error('No such session');
    }

    if (foundSession.expireAtRefreshToken < Date.now()) {
      throw new Error('Refresh Token Expired');
    }


    let expireAtAccessToken = Date.now() + 120e3;
    let expireAtRefreshToken = Date.now() + 7200e3;
    let accessToken = randToken.generate(32);
    let refreshToken = randToken.generate(32);


    let result = await this.sessionClass.refresh(refToken, {
      accessToken,
      refreshToken,
      expireAtAccessToken,
      expireAtRefreshToken
    });


    if (!result.acknowledged) {
      throw new Error('DB error');
    }
    return {
      refreshToken,
      accessToken,
      expireAtAccessToken
    }

  }

}



