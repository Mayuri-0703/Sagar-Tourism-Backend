import Inquiry from "../models/inquiryModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, country, message } = req.body;

    const inquiry = await Inquiry.create({
      fullName: name,
      email,
      phone,
      country,
      message,
    });

    const html = `
      <h2>New Visa Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Destination Country:</strong> ${country}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send to Admin
await sendEmail(
  process.env.ADMIN_EMAIL,
  "New Visa Inquiry",
  html
);

// Send confirmation to User
await sendEmail(
  email,
  "Inquiry Received – SMC Tourism",
  `
    <h3>Dear ${name},</h3>
    <p>Thank you for contacting SMC Tourism.</p>
    <p>We have received your inquiry regarding <b>${country}</b>.</p>
    <p>Our team will contact you shortly.</p>
    <br/>
    <p>Regards,<br/>SMC Tourism</p>
  `
);


    res.json({ success: true });

  } catch (error) {
    console.error("Inquiry Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
