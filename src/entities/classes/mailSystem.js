const nodemailer = require('nodemailer');
// Создаем транспорт для отправки писем
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gymprojecttest@mail.ru',
    pass: '1235jxnzi1dzx',
  }
});
// Настройки письма
let mailOptions = {
  from: 'gymprojecttest@mail.ru',
  to: 'landex617229@yandex.ru',
  subject: 'Password Recovery',
  text: 'Привет, это тестовое сообщение!'
};
// Отправляем письмо
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Письмо успешно отправлено: ' + info.response);
  }
});