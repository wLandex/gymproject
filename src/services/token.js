const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

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


    let expireAtAccessToken = Date.now() + MINUTE * 2;
    let expireAtRefreshToken = Date.now() + HOUR * 2;
    let accessToken = this.sessionClass.generateToken();
    let refreshToken = this.sessionClass.generateToken();


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



