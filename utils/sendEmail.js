// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const sendEmail = async ({ to, subject, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",  
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.APP_PASSWORD,
//     },
//   });

//   try {
//     const info = await transporter.sendMail({
//       from: `"Sagar Tourism" <${process.env.EMAIL}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("📩 Email sent to:", to, info.response);
//     return info;
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     throw error;
//   }
// };

// utils/sendEmail.js
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Sagar Tourism <noreply@sagartourism.in>", // use your domain later
      to,
      subject,
      html,
    });

    console.log("📩 Email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Resend Email error:", error);
    throw error;
  }
};

