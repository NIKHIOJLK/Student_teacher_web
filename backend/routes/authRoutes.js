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
router.get("/teachers", getAllTeachers);

// Teacher profile (PUBLIC)
router.get("/teachers/:id", getTeacherById);

export default router;
