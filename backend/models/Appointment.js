// backend/models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  teacher: { type: String, required: true },      // teacher name (string)
  department: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
