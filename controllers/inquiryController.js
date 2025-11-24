import Inquiry from "../models/Inquiry.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, country, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required."
      });
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim(),
      country: country?.trim() || "",
      message: message.trim(),
    });

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully!"
    });

    // Send emails asynchronously
    setImmediate(async () => {
      try {
        // ADMIN EMAIL
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Inquiry from ${inquiry.name}`,
          html: `<h2>New Inquiry Received</h2>
                 <p><b>Name:</b> ${inquiry.name}</p>
                 <p><b>Email:</b> ${inquiry.email}</p>
                 <p><b>Country:</b> ${inquiry.country}</p>
                 <p><b>Message:</b> ${inquiry.message}</p>`
        });

        // USER EMAIL
        await sendEmail({
          to: inquiry.email,
          subject: "We received your inquiry — Sagar Tourism",
          html: `<p>Hi ${inquiry.name},</p>
                 <p>Thank you for reaching out. Our team will contact you soon.</p>`
        });

      } catch (err) {
        console.error("Resend error:", err);
      }
    });

  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

