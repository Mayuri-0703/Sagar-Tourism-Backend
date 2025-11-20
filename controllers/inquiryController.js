// controllers/inquiryController.js
import Inquiry from "../models/Inquiry.js";
import { sendEmail } from "../utils/sendEmail.js";  // ✅ correct import

export const createInquiry = async (req, res) => {
  try {
    const { name, email, country, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required." });
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim(),
      country: country ? country.trim() : "",
      message: message.trim(),
    });

    // ✅ Send admin email
    const adminHtml = `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Country:</strong> ${inquiry.country || "N/A"}</p>
      <p><strong>Message:</strong><br/>${inquiry.message}</p>
      <p><small>Received at: ${inquiry.createdAt}</small></p>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL,
      subject: `New Inquiry from ${inquiry.name}`,
      html: adminHtml,
    });

    // ✅ Send user confirmation email
    const userHtml = `
      <p>Hi ${inquiry.name},</p>
      <p>Thank you for contacting Sagar Marine Consultancy. We have received your message and will get back soon.</p>
      <p><strong>Your message:</strong> ${inquiry.message}</p>
      <p>— SMC Team</p>
    `;

    await sendEmail({
      to: inquiry.email,
      subject: "We received your inquiry — SMC",
      html: userHtml,
    });

    return res.status(201).json({ success: true, message: "Inquiry submitted successfully!" });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
