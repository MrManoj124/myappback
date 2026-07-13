// ============================================
// FILE: utils/emailTemplates.js
// ============================================
const { sendEmail } = require('../config/email');

/**
 * Send email verification link to user
 * @param {string} email - Recipient email address
 * @param {string} token - Verification token
 */
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f1a; }
        .container { max-width: 580px; margin: 40px auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(102, 126, 234, 0.2); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 15px; }
        .body { padding: 40px; }
        .body p { color: #a0aec0; font-size: 15px; line-height: 1.7; margin: 0 0 20px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white !important; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 10px 0 24px; }
        .url-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; word-break: break-all; color: #667eea; font-size: 13px; margin-top: 16px; }
        .footer { padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.07); text-align: center; }
        .footer p { color: #4a5568; font-size: 13px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 TruosTek</h1>
          <p>Authentication Platform</p>
        </div>
        <div class="body">
          <p>Hi there! 👋</p>
          <p>Thanks for registering with <strong style="color:#667eea">TruosTek</strong>. Please verify your email address to activate your account and get started.</p>
          <div style="text-align:center">
            <a href="${verificationUrl}" class="button">✅ Verify My Email</a>
          </div>
          <p>Or copy and paste this URL into your browser:</p>
          <div class="url-box">${verificationUrl}</div>
          <p style="margin-top:24px; color:#718096; font-size:13px;">⏰ This link expires in <strong>24 hours</strong>. If you didn't create an account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} TruosTek. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: '✅ Verify Your TruosTek Email Address',
    html
  });
};

/**
 * Send password reset link to user
 * @param {string} email - Recipient email address
 * @param {string} token - Reset token
 */
const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f1a; }
        .container { max-width: 580px; margin: 40px auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(239, 68, 68, 0.2); }
        .header { background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); padding: 40px 40px 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 15px; }
        .body { padding: 40px; }
        .body p { color: #a0aec0; font-size: 15px; line-height: 1.7; margin: 0 0 20px; }
        .button { display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: white !important; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 10px 0 24px; }
        .url-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; word-break: break-all; color: #ef4444; font-size: 13px; margin-top: 16px; }
        .footer { padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.07); text-align: center; }
        .footer p { color: #4a5568; font-size: 13px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔑 Password Reset</h1>
          <p>TruosTek Authentication Platform</p>
        </div>
        <div class="body">
          <p>Hi there!</p>
          <p>We received a request to reset the password associated with your <strong style="color:#ef4444">TruosTek</strong> account. Click the button below to create a new password.</p>
          <div style="text-align:center">
            <a href="${resetUrl}" class="button">🔑 Reset My Password</a>
          </div>
          <p>Or copy and paste this URL into your browser:</p>
          <div class="url-box">${resetUrl}</div>
          <p style="margin-top:24px; color:#718096; font-size:13px;">⏰ This link expires in <strong>1 hour</strong>. If you didn't request a password reset, please ignore this email — your password will remain unchanged.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} TruosTek. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: '🔑 Reset Your TruosTek Password',
    html
  });
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
