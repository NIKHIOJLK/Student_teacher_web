// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], default: "student" },
  department: { type: String, default: "" },
  rollNumber: { type: String, default: "" },   // ✅ NEW FIELD
  phone: { type: String, default: "" }         // optional but useful
}, { timestamps: true });

export default mongoose.model("User", userSchema);
