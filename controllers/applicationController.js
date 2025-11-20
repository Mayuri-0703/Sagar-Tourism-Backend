import Application from "../models/applicationModel.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";

export const handleApplication = async (req, res) => {
  try {
    console.log("🧾 Full request body:", req.body);
    console.log("📸 File details:", req.file);

    if (!req.body.fullName || !req.body.email || !req.body.phone || !req.body.position) {
      return res.status(400).json({ success: false, message: "All required fields must be filled." });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file received" });
    }

    // Cloudinary Upload
    const uploadResult = await cloudinary.v2.uploader.upload_stream(
      { folder: "sagar-tourism-applications" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ success: false, message: "Upload failed" });
        }

        // Save in Database
        const application = await Application.create({
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          position: req.body.position,
          message: req.body.message || "",
          passportPhoto: result.secure_url,
        });

        // -------------------------------------
        // 1️⃣ SEND EMAIL TO ADMIN
        // -------------------------------------
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Application from ${req.body.fullName}`,
          html: `
            <h2>New Application Received</h2>
            <p><b>Name:</b> ${req.body.fullName}</p>
            <p><b>Email:</b> ${req.body.email}</p>
            <p><b>Phone:</b> ${req.body.phone}</p>
            <p><b>Position:</b> ${req.body.position}</p>
            <p><b>Message:</b> ${req.body.message}</p>
            <p><b>Photo:</b> <a href="${result.secure_url}">View Passport Photo</a></p>
          `,
        });

        // -------------------------------------
        // 2️⃣ SEND CONFIRMATION EMAIL TO USER
        // -------------------------------------
        const userHtml = `
          <h2>Application Received Successfully</h2>
          <p>Dear <b>${req.body.fullName}</b>,</p>
          <p>Thank you for submitting your visa application with 
          <strong>Sagar Marine Consultancy</strong>.</p>
          
          <p>Your application has been received and our team will contact you shortly.</p>

          <p><b>Submitted Details:</b></p>
          <p>Email: ${req.body.email}</p>
          <p>Phone: ${req.body.phone}</p>
          <p>Position Applied: ${req.body.position}</p>

          <br />
          <p>Best Regards,<br/>Sagar Marine Consultancy Team</p>
        `;

        await sendEmail({
          to: req.body.email,
          subject: "Your Visa Application Has Been Received ✔️",
          html: userHtml,
        });

        // Final API Response
        return res.status(201).json({
          success: true,
          message: "Application submitted successfully!",
          data: application,
        });
      }
    );

    uploadResult.end(req.file.buffer);

  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
