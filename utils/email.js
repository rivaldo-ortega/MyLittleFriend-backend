require('dotenv').config();
const sgMail = require('@sendgrid/mail')

async function sendEmail(data) {
 
  sgMail.setApiKey(process.env.EMAIL_API_KEY)
  const msg = {
    to: data.to, 
    from: 'mylittlefriend.makeitreal@gmail.com', 
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data,
  }
  
  try {
    await sgMail.send(msg)
  } catch(err) {
    console.error(err)
  }
}

module.exports = {sendEmail};