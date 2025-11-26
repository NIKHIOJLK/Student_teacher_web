// src/pages/BookAppointment.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookAppointment = () => {
  const token = localStorage.getItem("token");
  const studentName = localStorage.getItem("name");
  const studentEmail = localStorage.getItem("email");

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const res = await axios.get("/api/auth/teachers");
        setTeachers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("load teachers", err);
        setTeachers([]);
      }
    };
    loadTeachers();
  }, []);

  const fetchSlots = async (teacherId) => {
    setSlots([]);
    setSelectedSlot(null);
    try {
      const res = await axios.get(`/api/availability/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSlots(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("fetchSlots", err);
    }
  };

  const handleTeacherChange = (e) => {
    const id = e.target.value;
    setSelectedTeacher(id);
    if (id) fetchSlots(id);
  };

  const handleBook = async () => {
    if (!selectedSlot) return setStatusMsg("Pick a slot first.");

    // find teacher object to get teacher name
    const teacherObj = teachers.find(t => t._id === selectedTeacher);

    try {
      await axios.post(
        "/api/appointments/book",
        {
          studentName,
          studentEmail,
          teacher: teacherObj.name, // 🔥 SEND TEACHER NAME
          department: teacherObj.department,
          date: selectedSlot.date,
          time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
          message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatusMsg("Booked successfully!");
      setMessage("");
      setSelectedSlot(null);
    } catch (err) {
      console.error("book error", err);
      setStatusMsg(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow">
        <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Select Teacher</label>
            <select value={selectedTeacher} onChange={handleTeacherChange} className="w-full border rounded-xl px-4 py-3">
              <option value="">-- Choose a teacher --</option>
              {teachers.map(t => (
                <option key={t._id} value={t._id}>
                  {t.name} — {t.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Available Slots</label>
            {slots.length === 0 ? (
              <p className="text-gray-500">No slots available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {slots.map(s => (
                  <button
                    key={s._id}
                    onClick={() => setSelectedSlot(s)}
                    className={`text-left p-3 rounded-xl border ${
                      selectedSlot && selectedSlot._id === s._id ? "bg-blue-100 border-blue-400" : "bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold">{s.date}</div>
                    <div className="text-sm">{s.startTime} - {s.endTime}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1">Message (optional)</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded-xl px-4 py-3" rows={4} />
          </div>

          {statusMsg && <div className="p-3 rounded bg-yellow-100 text-yellow-800">{statusMsg}</div>}

          <div className="flex justify-end gap-3">
            <button onClick={handleBook} className="bg-blue-600 text-white px-6 py-2 rounded-full">
              Book Selected Slot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
