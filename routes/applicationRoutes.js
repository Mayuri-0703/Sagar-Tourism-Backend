import express from "express";
import multer from "multer";
import { handleApplication } from "../controllers/applicationController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("passportPhoto"), handleApplication);

export default router;

