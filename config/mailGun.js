const formData = require("form-data");
const MailGun = require("mailgun.js");

const mailgun = new MailGun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.API_KEY,
});

exports.sendEmail = async (messageData) => {
  return await client.messages.create(process.env.DOMAIN, messageData);
};
