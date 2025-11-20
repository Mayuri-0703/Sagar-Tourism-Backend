// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // ✅ ensure .env is loaded even if not from root

// Debugging logs to verify env values
console.log("Loaded EMAIL:", process.env.EMAIL);
console.log("Loaded APP_PASSWORD:", process.env.APP_PASSWORD ? "✅ Found" : "❌ Missing");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // ✅ Explicitly use Gmail SMTP
  port: 465,               // Secure port
  secure: true,            // Use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendMail = async (options) => {
  const mailOptions = {
    from: options.from || `"SMC Website" <${process.env.EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  return transporter.sendMail(mailOptions);
};

