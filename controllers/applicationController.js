import Application from "../models/applicationModel.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";
import multer from "multer";

// Multer in-memory storage
export const upload = multer({ storage: multer.memoryStorage() });

export const handleApplication = async (req, res) => {
  try {
    const { fullName, email, phone, position, message } = req.body;

    // Mandatory fields check
    if (!fullName || !email || !phone || !position || !req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields including passport photo are required." 
      });
    }

    // Save basic application in DB immediately
    const app = await Application.create({
      fullName,
      email,
      phone,
      position,
      message: message || "Visa Application",
    });

    // Respond to frontend immediately
    res.status(201).json({ 
      success: true, 
      message: "Application submitted successfully!", 
      data: app 
    });

    // Handle Cloudinary + emails asynchronously
    setImmediate(() => {
      // 1️⃣ Upload passport photo to Cloudinary
      cloudinary.v2.uploader.upload_stream(
        { folder: "sagar-tourism-applications" }, 
        async (err, result) => {
          if (err) return console.error("Cloudinary error:", err);
          app.passportPhoto = result.secure_url;
          await app.save().catch(console.error);
        }
      ).end(req.file.buffer);

      // 2️⃣ Send emails asynchronously
      (async () => {
        try {
          // Admin email
          await sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: `New Application from ${fullName}`,
            html: `<h2>New Application Received</h2>
                   <p><b>Name:</b> ${fullName}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Phone:</b> ${phone}</p>
                   <p><b>Position:</b> ${position}</p>`
          });

          // User confirmation email
          await sendEmail({
            to: email,
            subject: "Your Visa Application Received ✔️",
            html: `<p>Dear ${fullName},</p>
                   <p>Thank you for submitting your visa application.</p>
                   <p>We will contact you shortly.</p>`
          });
        } catch (err) {
          console.error("Email error:", err);
        }
      })();
    });

  } catch (error) {
    console.error("Application submission error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
