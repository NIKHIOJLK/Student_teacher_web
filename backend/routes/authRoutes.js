import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getTeacherById,
  getAllTeachers,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile
router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);

// Teachers API (PUBLIC)
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    return res.status(200).json(teachers);
  } catch (err) {
    return res.status(500).json({ message: "Failed to load teachers", error: err.message });
  }
});

// Teacher profile (PUBLIC)
router.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    return res.status(200).json(teacher);
  } catch (err) {
    return res.status(500).json({ message: "Failed to load teacher", error: err.message });
  }
});

export default router;
