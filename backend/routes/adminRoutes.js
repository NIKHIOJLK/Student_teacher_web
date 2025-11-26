// backend/routes/adminRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  getAllAppointmentsAdmin,
  createAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// protect + allow only admin role
router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/appointments", getAllAppointmentsAdmin);

// Optional create admin endpoint (protected) — you can remove if you prefer script-only creation
router.post("/create", createAdmin);

export default router;
