import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import "./config/cloudinaryConfig.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/inquiry", inquiryRoutes);
app.use("/api/application", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

