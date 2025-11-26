import Appointment from "../models/Appointment.js";

// ================================
// BOOK APPOINTMENT
// ================================
export const bookAppointment = async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      teacher,
      department,
      date,
      time,
      message,
    } = req.body;

    if (!studentName || !studentEmail || !teacher || !department || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // prevent duplicate booking same teacher + date + time
    const alreadyBooked = await Appointment.findOne({
      studentEmail,
      teacher,
      date,
      time,
    });

    if (alreadyBooked) {
      return res.status(400).json({ error: "You already booked this slot" });
    }

    const newAppointment = new Appointment({
      studentName,
      studentEmail,
      teacher,
      department,
      date,
      time,
      message,
      status: "Pending",
    });

    await newAppointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });

  } catch (err) {
    console.error("bookAppointment error:", err);
    return res.status(500).json({ error: "Failed to create appointment" });
  }
};

// ================================
// STUDENT: GET MY APPOINTMENTS
// ================================
export const getMyAppointments = async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) return res.status(400).json({ error: "Email is required" });

    const appointments = await Appointment.find({ studentEmail: userEmail })
      .sort({ date: 1, time: 1 });

    return res.json(appointments);
  } catch (err) {
    console.error("getMyAppointments error:", err);
    return res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// ================================
// TEACHER: GET APPOINTMENTS FOR TEACHER
// ================================
export const getAppointmentsForTeacher = async (req, res) => {
  try {
    const teacherName = req.query.teacher;
    if (!teacherName) return res.status(400).json({ error: "Teacher name is required" });

    const appointments = await Appointment.find({ teacher: teacherName })
      .sort({ date: 1, time: 1 });

    return res.json(appointments);
  } catch (err) {
    console.error("getAppointmentsForTeacher error:", err);
    return res.status(500).json({ error: "Failed to fetch teacher appointments" });
  }
};

// ================================
// ADMIN or TEACHER: GET ALL
// ================================
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    return res.json(appointments);
  } catch (err) {
    console.error("getAllAppointments error:", err);
    return res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// ================================
// GET APPOINTMENT BY ID
// ================================
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    return res.json(appointment);
  } catch (err) {
    console.error("getAppointmentById error:", err);
    return res.status(500).json({ error: "Failed to fetch appointment" });
  }
};

// ================================
// UPDATE APPOINTMENT (Teacher)
// ================================
export const updateAppointment = async (req, res) => {
  try {
    const allowedStatuses = ["Pending", "Approved", "Rejected", "Completed"];

    const updateFields = req.body;

    if (updateFields.status && !allowedStatuses.includes(updateFields.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Appointment not found" });

    return res.json(updated);
  } catch (err) {
    console.error("updateAppointment error:", err);
    return res.status(500).json({ error: "Failed to update appointment" });
  }
};

// ================================
// DELETE APPOINTMENT
// ================================
export const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Appointment not found" });

    return res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("deleteAppointment error:", err);
    return res.status(500).json({ error: "Failed to delete appointment" });
  }
};
