// import Inquiry from "../models/inquiryModel.js";
// import { sendEmail } from "../utils/sendEmail.js";

// export const createInquiry = async (req, res) => {
//   try {
//     const { name, email, phone, country, message } = req.body;

//     // ---- BASIC VALIDATION ----
//     if (!name || !email || !phone || !country || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ---- SAVE TO DATABASE ----
//     await Inquiry.create({
//       fullName: name,
//       email,
//       phone,
//       country,
//       message,
//     });

//     // ---- ADMIN EMAIL ----
//     const adminHtml = `
//       <h2>New Visa Inquiry</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone}</p>
//       <p><strong>Destination Country:</strong> ${country}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `;

//     const adminMailSent = await sendEmail(
//       process.env.ADMIN_EMAIL,
//       "New Visa Inquiry – SMC Tourism",
//       adminHtml
//     );

//     // ---- USER CONFIRMATION EMAIL ----
//     const userHtml = `
//       <h3>Dear ${name},</h3>
//       <p>Thank you for contacting <b>SMC Tourism</b>.</p>
//       <p>We have received your inquiry regarding <b>${country}</b>.</p>
//       <p>Our team will contact you shortly.</p>
//       <br/>
//       <p>Regards,<br/>SMC Tourism</p>
//     `;

//     const userMailSent = await sendEmail(
//       email,
//       "Inquiry Received – SMC Tourism",
//       userHtml
//     );

//     // ---- CHECK EMAIL STATUS ----
//     if (!adminMailSent || !userMailSent) {
//       return res.status(500).json({
//         success: false,
//         message: "Inquiry saved but email delivery failed",
//       });
//     }

//     // ---- SUCCESS RESPONSE ----
//     return res.json({ success: true });

//   } catch (error) {
//     console.error("Inquiry Error FULL:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

import Inquiry from "../models/inquiryModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, country, message } = req.body;

    if (!name || !email || !phone || !country || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await Inquiry.create({
      fullName: name,
      email,
      phone,
      country,
      message,
    });

    // ================= ADMIN EMAIL =================
    const adminHtml = `
      <h2>New Visa Inquiry</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Country:</b> ${country}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    const adminMail = await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Visa Inquiry – SMC Tourism",
      adminHtml
    );

    // ================= USER CONFIRMATION EMAIL =================
    const userHtml = `
      <h3>Dear ${name},</h3>
      <p>Thank you for contacting <b>SMC Tourism</b>.</p>
      <p>We have received your inquiry regarding <b>${country}</b>.</p>
      <p>Our team will contact you shortly.</p>
      <br/>
      <p>Regards,<br/><b>SMC Tourism</b></p>
    `;

    const userMail = await sendEmail(
      email,
      "Inquiry Received – SMC Tourism",
      userHtml
    );

    // ================= MAIL CHECK =================
    if (!adminMail || !userMail) {
      return res.status(500).json({
        success: false,
        message: "Inquiry saved but email delivery failed",
      });
    }

    return res.json({ success: true });

  } catch (error) {
    console.error("Inquiry Error FULL:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};