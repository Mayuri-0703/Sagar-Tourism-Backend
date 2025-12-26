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

    await sendEmail(process.env.ADMIN_EMAIL, "New Visa Inquiry", html);

    res.json({ success: true });

  } catch (error) {
    console.error("Inquiry Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
