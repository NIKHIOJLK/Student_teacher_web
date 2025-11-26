// backend/scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@thapar.edu";     // CHANGE THIS
    const password = "Admin123";          // CHANGE BEFORE DEPLOY

    const already = await Admin.findOne({ email });
    if (already) {
      console.log("⚠️ Admin already exists:", email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({ email, password: hashedPassword });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email:", newAdmin.email);
    console.log("🔑 Password (plain, for your notes):", password);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
