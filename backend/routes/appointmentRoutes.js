// backend/routes/appointmentRoutes.js
import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getAppointmentsForTeacher,
  getAllAppointments,
  updateAppointment,
  getAppointmentById,
  deleteAppointment
} from "../controllers/appointmentController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// STUDENT → Book appointment
router.post("/book", protect, authorizeRoles("student"), bookAppointment);

// STUDENT → Get their own appointments
router.get("/my", protect, authorizeRoles("student"), getMyAppointments);

// TEACHER → View appointments assigned to them
router.get("/teacher", protect, authorizeRoles("teacher"), getAppointmentsForTeacher);

// ADMIN / TEACHER → View all appointments
router.get("/", protect, authorizeRoles("teacher"), getAllAppointments);

// Single appointment
router.get("/:id", protect, getAppointmentById);

// Update (teacher only)
router.put("/:id", protect, authorizeRoles("teacher"), updateAppointment);

// Delete (teacher only)
router.delete("/:id", protect, authorizeRoles("teacher"), deleteAppointment);

export default router;
