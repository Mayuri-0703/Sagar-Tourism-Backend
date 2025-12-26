import { sendEmail } from "./utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

sendEmail({
  to: process.env.ADMIN_EMAIL,
  subject: "Test OAuth2 Email",
  html: "<h2>OAuth2 Gmail is working 🎉</h2>",
}).then((res) => {
  console.log("SUCCESS:", res);
}).catch((err) => {
  console.log("ERROR:", err);
});

