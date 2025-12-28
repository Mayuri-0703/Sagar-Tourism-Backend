import cloudinary from "../config/cloudinaryConfig.js";
import Application from "../models/applicationModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const handleApplication = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { fullName, email, phone, passportNumber } = req.body;

    if (!fullName || !email || !phone || !passportNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Passport photo required",
      });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "visa-applications" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    await Application.create({
      fullName,
      email,
      phone,
      passportNumber,
      passportPhoto: uploadResult.secure_url,
    });

    const html = `
      <h2>New Visa Application</h2>
      <p><b>Name:</b> ${fullName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Passport Number:</b> ${passportNumber}</p>
      <p><a href="${uploadResult.secure_url}">View Passport Photo</a></p>
    `;

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Visa Application Received",
      html
    );

    await sendEmail(
  email,
  "Visa Application Submitted – SMC Tourism",
  `
    <h3>Dear ${fullName},</h3>
    <p>Your visa application has been submitted successfully.</p>
    <p>Our team will review your application and contact you soon.</p>
    <br/>
    <p>Regards,<br/>SMC Tourism</p>
  `
);

    return res.json({ success: true });

  } catch (error) {
    console.error("Application Error FULL:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
