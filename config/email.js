// ============================================
// FILE: config/email.js
// ============================================
const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send email helper
const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"TruosTek" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, createTransporter };