// src/pages/TeacherDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch teacher info
  const fetchTeacher = async () => {
    try {
      const res = await axios.get(`/api/teacher/${id}`);
      setTeacher(res.data);
    } catch (err) {
      console.error("Teacher fetch error:", err);
    }
  };

  // Fetch availability
  const fetchAvailability = async () => {
    try {
      const res = await axios.get(`/api/availability/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const next7 = new Date();
      next7.setDate(today.getDate() + 7);
      next7.setHours(23, 59, 59, 999);

      const filtered = res.data
        .filter((slot) => {
          const slotDate = new Date(slot.date);
          return slotDate >= today && slotDate <= next7;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setAvailability(filtered);
    } catch (err) {
      console.error("Availability fetch error:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchTeacher();
      await fetchAvailability();
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center py-20 text-lg text-gray-600">
        Loading teacher details...
      </p>
    );
  }

  if (!teacher) {
    return (
      <p className="text-center py-20 text-lg text-gray-600">
        Teacher not found.
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-lg border border-gray-100">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">{teacher.name}</h1>
          <p className="text-gray-600 text-lg">{teacher.department}</p>
          <p className="text-gray-500 mt-1">{teacher.email}</p>
        </div>

        {/* Availability */}
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          Available in the Next 7 Days
        </h2>

        {availability.length === 0 ? (
          <p className="text-gray-500">No available slots this week.</p>
        ) : (
          <div className="space-y-5">
            {availability.map((slot) => (
              <div
                key={slot._id}
                className="border rounded-xl p-5 bg-indigo-50 shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-gray-900">📅 {slot.date}</p>
                <p className="text-gray-700 mt-1">
                  ⏰ {slot.startTime} – {slot.endTime}
                </p>

                <button
                  onClick={() =>
                    navigate("/studentdashboard", {
                      state: {
                        teacherId: id,
                        teacherName: teacher.name,
                        teacherEmail: teacher.email,
                        teacherDepartment: teacher.department,
                        date: slot.date,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        slotId: slot._id,
                      },
                    })
                  }
                  className="mt-4 w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherDetails;
