const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host:"smtp.gmail.com",
   service: "gmail",
   port: 587,
   secure: false,
   auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },

  
});


const sendVerificationEmail = async (email, name, token) => {
  
  const mailOptions = {
    from: `"Royal Hotel" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Verify Your Email - Royal Hotel",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f2f2f2;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color: #2c3e50; padding: 20px; color: white; text-align: center;">
            <h1 style="margin: 0;">Welcome to Royal Hotel</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #333;">Hello ${name.split(" ")[0]},</h2>
            <p style="font-size: 16px; color: #555;">
              Thank you for registering! Please verify your email address to activate your account.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173/api/auth/verify/${token}" 
                 style="background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p style="color: #999; font-size: 14px;">
              This link will expire in 5 minutes. If you didn’t request this, you can safely ignore this email.
            </p>
          </div>
          <div style="background-color: #ecf0f1; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            &copy; ${new Date().getFullYear()} Hotel Booking. All rights reserved.
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
