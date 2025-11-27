// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentEmail = localStorage.getItem("email");
  const studentName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/appointments/my?email=${studentEmail}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = Array.isArray(res.data) ? res.data : [];
        setAppointments(data.slice(0, 3)); // show only 3
      } catch (err) {
        console.log("Student dashboard appointments fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentEmail, token]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {studentName?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600 mb-10">Your student dashboard</p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => navigate("/teachers")}
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition border"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              Find Teachers
            </h2>
            <p className="text-gray-600 text-sm">
              Browse teachers & view their availability
            </p>
          </button>

          <button
            onClick={() => navigate("/book")}
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition border"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Book Appointment
            </h2>
            <p className="text-gray-600 text-sm">
              Schedule a meeting with a teacher
            </p>
          </button>

          <button
            onClick={() => navigate("/myappointments")}
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition border"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-700">
              My Appointments
            </h2>
            <p className="text-gray-600 text-sm">
              View & track your appointments
            </p>
          </button>
        </div>

        {/* Upcoming Appointments */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Upcoming Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-600">No upcoming appointments.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {a.teacher} — {a.department}
                </h3>
                <p className="text-gray-700 mt-1">
                  📅 {a.date} &nbsp; ⏰ {a.time}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    a.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : a.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentDashboard;
