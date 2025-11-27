import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  getAllAppointmentsAdmin,
  createAdmin
} from "../controllers/adminController.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// protect + allow only admin role
router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/appointments", getAllAppointmentsAdmin);

// ⭐ DELETE appointment history
router.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// Optional create admin
router.post("/create", createAdmin);

export default router;
