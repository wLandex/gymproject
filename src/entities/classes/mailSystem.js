const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'gymprojecttest@mail.ru',
    pass: `${process.env.PASSWORD}`
  }
});


module.exports = {
  async sendEmail(sendTo, recoveryToken) {
    let mailOptions = {
      from: 'gymprojecttest@mail.ru',
      to: `${sendTo}`,
      subject: 'Password Recovery',
      text: `Your password recovery token: ${recoveryToken}`
    };
// Отправляем письмо
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Письмо успешно отправлено: ' + info.response);
      }
    });
  }


}

