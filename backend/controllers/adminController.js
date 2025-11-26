// backend/controllers/adminController.js
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

/**
 * Admin-only controllers:
 * - getAllUsers
 * - deleteUser
 * - getAllAppointments
 * - createAdmin (optional utility)
 */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    return res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

export const getAllAppointmentsAdmin = async (req, res) => {
  try {
    const appts = await Appointment.find().sort({ date: 1, time: 1 });
    return res.json(appts);
  } catch (err) {
    console.error("getAllAppointmentsAdmin error:", err);
    return res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Optional: create admin via API (use carefully)
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email & password required" });

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const admin = await Admin.create({ email, password: hashed });
    return res.status(201).json({ message: "Admin created", adminId: admin._id });
  } catch (err) {
    console.error("createAdmin error:", err);
    return res.status(500).json({ error: "Failed to create admin" });
  }
};
