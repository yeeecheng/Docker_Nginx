const nodemailer = require('nodemailer');

function sendEmail(user, item) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'smartfarmpysy@gmail.com',
        pass: 'bqesxaekougkqbsk'
      }
  })
    
  var mailOptions = {
  from: 'smartfarmpysy@gmail.com',
  to: user.account,
  subject: item.subject,
  text: item.message
  }
  
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }})
}
module.exports =  sendEmail