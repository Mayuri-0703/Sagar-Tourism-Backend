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
//       from: process.env.EMAIL,
//       to,
//       subject,
//       html,
//     });

//     console.log("📩 Email sent to:", to, info.response);
//     return info;
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     throw error; // important to catch errors in the controllers
//   }
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Sagar Tourism" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("📩 Email sent to:", to, info.response);
    return info;
  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};
