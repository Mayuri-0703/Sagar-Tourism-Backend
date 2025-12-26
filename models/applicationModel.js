import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    passportPhoto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);

