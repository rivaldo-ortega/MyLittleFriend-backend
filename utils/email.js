require('dotenv').config();
const sgMail = require('@sendgrid/mail')

// const { email, password } = require('../config/index');
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(data) {
  // sgMail.setApiKey('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')
  sgMail.setApiKey(process.env.EMAIL_API_KEY)
  const msg = {
    to: data.to, // Change to your recipient
    from: 'mylittlefriend.makeitreal@gmail.com', // Change to your verified sender
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data,
  }
  
  try {
    const response = await sgMail.send(msg)
    console.log('envio correo')
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  } catch(err) {
    console.error(err)
  }
}

module.exports = {sendEmail};