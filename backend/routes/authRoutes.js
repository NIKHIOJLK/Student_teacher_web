import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getTeacherById,
  getAllTeachers
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);

router.get("/teachers", getAllTeachers);
router.get("/teacher/:id", getTeacherById);

export default router;
