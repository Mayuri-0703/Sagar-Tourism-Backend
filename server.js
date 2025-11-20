import express from "express";
import dotenv from "dotenv";  // <<< ONLY ONE
import cors from "cors";
import connectDB from "./config/db.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import "./config/cloudinaryConfig.js";  // loads cloudinary keys

dotenv.config(); // <<< ONLY ONE

const app = express();

app.use(express.json());
app.use(cors());

// Connect database
connectDB();

// Routes
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/application", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

