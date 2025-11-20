// import mongoose from "mongoose";

// const applicationSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   position: { type: String, required: true },
//   passportPhoto: { type: String, required: true }, // Cloudinary URL
//   message: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Application", applicationSchema);

import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String },
  passportPhoto: { type: String },
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
