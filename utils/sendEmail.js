// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//       },
//     });

//     const mailOptions = {
//       from: `Sagar Tourism <${process.env.EMAIL}>`,
//       to,
//       subject,
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email Sent Successfully →", to);
//     return true;

//   } catch (err) {
//     console.error("EMAIL SEND FAILED:", err.message);
//     return false;
//   }
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Sagar Tourism <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent to:", to);
    return true;

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.message);
    return false;
  }
};
