import express from "express";
import {
  addAvailability,
  getMyAvailability,
  getAvailabilityForTeacher
} from "../controllers/availabilityController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher creates availability
router.post("/", protect, authorizeRoles("teacher"), addAvailability);

// Get teacher's own availability
router.get("/my", protect, authorizeRoles("teacher"), getMyAvailability);

// Students view teacher availability
router.get("/:teacherId", protect, getAvailabilityForTeacher);

export default router;
