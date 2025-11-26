// backend/controllers/availabilityController.js
import Availability from "../models/Availability.js";

/* ---------------------------------------------------
   ADD AVAILABILITY (Teacher)
----------------------------------------------------*/
export const addAvailability = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const teacherName = req.user.name;

    const { date, startTime, endTime, notes } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const slot = await Availability.create({
      teacherId,
      teacherName,
      date,
      startTime,
      endTime,
      notes: notes || ""
    });

    return res.status(201).json(slot);
  } catch (err) {
    console.error("addAvailability error:", err);
    return res.status(500).json({ error: "Failed to add availability" });
  }
};

/* ---------------------------------------------------
   GET MY AVAILABILITY (Teacher)
----------------------------------------------------*/
export const getMyAvailability = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const slots = await Availability.find({ teacherId }).sort({
      date: 1,
      startTime: 1
    });

    return res.json(slots);
  } catch (err) {
    console.error("getMyAvailability error:", err);
    return res.status(500).json({ error: "Failed to fetch availability" });
  }
};

/* ---------------------------------------------------
   GET AVAILABILITY FOR STUDENTS (Teacher ID)
----------------------------------------------------*/
export const getAvailabilityForTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const slots = await Availability.find({ teacherId }).sort({
      date: 1,
      startTime: 1
    });

    return res.json(slots);
  } catch (err) {
    console.error("getAvailabilityForTeacher error:", err);
    return res.status(500).json({ error: "Failed to fetch teacher availability" });
  }
};
