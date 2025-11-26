// backend/models/Availability.js
import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teacherName: { type: String },         // added - convenient display field
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model("Availability", availabilitySchema);
