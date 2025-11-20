import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const checkStorage = async () => {
  try {
    // ✅ Connect and force the correct DB name
    await mongoose.connect(MONGODB_URI, {
      dbName: "Sagar-Tourism",
    });
    console.log("✅ Connected to MongoDB");

    // ✅ Explicitly reference that database
    const db = mongoose.connection.db;

    const stats = await db.stats();
    const dataSizeMB = stats.dataSize / (1024 * 1024);

    console.log(`📊 Current Database Size: ${dataSizeMB.toFixed(2)} MB`);

    if (dataSizeMB > 480) {
      console.log("⚠️  Warning: Approaching 512 MB limit!");
    } else {
      console.log("✅ Database size is within safe limit.");
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error checking MongoDB size:", error);
  }
};

checkStorage();
