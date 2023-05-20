"use-strict";
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
sgMail.setApiKey( process.env.SENDGRID_API_KEY);
const sendEmail = (email, name) =>
{
    sgMail.send({
        to: email,
        cc: "someone@example.org",
        bcc: ["me@example.org", "you@example.org"],
        from: "ibrahim3hmedib@gmail.com",
        subject: "My first email!",
        text: `Welcome to the app, ${name}`,
    });
};
const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    cc: "someone@example.org",
    bcc: ["me@example.org", "you@example.org"],
    from: "ibrahim3hmedib@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};
module.exports = {
    sendEmail,
    sendCancellationEmail
}