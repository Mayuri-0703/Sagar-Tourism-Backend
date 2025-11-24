import Application from "../models/applicationModel.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";
import multer from "multer";

// Multer In-Memory
export const upload = multer({ storage: multer.memoryStorage() });

export const handleApplication = async (req, res) => {
  try {
    const { fullName, email, phone, position, message } = req.body;

    if (!fullName || !email || !phone || !position || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including passport photo are required."
      });
    }

    const app = await Application.create({
      fullName,
      email,
      phone,
      position,
      message: message || "Visa Application"
    });

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: app
    });

    // Handle the heavy tasks asynchronously
    setImmediate(() => {
      // Upload image to Cloudinary
      cloudinary.v2.uploader.upload_stream(
        { folder: "sagar-tourism-applications" },
        async (err, result) => {
          if (err) {
            console.error("Cloudinary Error:", err);
            return;
          }
          app.passportPhoto = result.secure_url;
          await app.save().catch(console.error);
        }
      ).end(req.file.buffer);

      // Send emails after upload
      (async () => {
        try {
          // ADMIN EMAIL
          await sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: `New Application from ${fullName}`,
            html: `<h2>New Visa Application</h2>
                   <p><b>Name:</b> ${fullName}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Phone:</b> ${phone}</p>
                   <p><b>Position:</b> ${position}</p>`
          });

          // USER EMAIL
          await sendEmail({
            to: email,
            subject: "Your Visa Application Received ✔️",
            html: `<p>Dear ${fullName},</p>
                   <p>Your visa application has been received successfully.</p>
                   <p>We will get back to you shortly.</p>`
          });

        } catch (err) {
          console.error("Email sending error (Resend):", err);
        }
      })();
    });

  } catch (error) {
    console.error("Application submission error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
