
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async (to, subject, html) => {
//   try {
//     await resend.emails.send({
//       from: "SMC Tourism <onboarding@resend.dev>", // ✅ MUST BE THIS
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent to:", to);
//     return true;

//   } catch (error) {
//     console.error("❌ EMAIL ERROR:", error);
//     return false;
//   }
// };
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "SMC Tourism <onboarding@resend.dev>", // 🔴 MUST BE THIS
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