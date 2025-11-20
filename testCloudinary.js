// testCloudinary.js
import cloudinary from "./utils/cloudinary.js";

(async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected:", result.status);
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);
  }
})();
