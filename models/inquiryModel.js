import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
