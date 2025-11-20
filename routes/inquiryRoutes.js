// routes/inquiryRoutes.js
import express from "express";
import { createInquiry } from "../controllers/inquiryController.js";

const router = express.Router();

// POST /api/inquiry
router.post("/", createInquiry);

export default router;
