
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: `Sagar Tourism <${process.env.EMAIL}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent to:", to);
//     return true;

//   } catch (error) {
//     console.error("❌ EMAIL ERROR:", error.message);
//     return false;
//   }
// };

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "Sagar Tourism <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent");
    return true;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    return false;
  }
};
