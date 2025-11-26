// src/pages/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const teacherName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await axios.get(
          `/api/appointments/teacher?teacher=${teacherName}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(res.data.slice(0, 3)); // show 3
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, Prof. {teacherName?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600 mb-10">Your teacher dashboard</p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => navigate("/addavailability")}
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition border"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Add Availability</h2>
            <p className="text-gray-600 text-sm">Let students know when you’re free</p>
          </button>

          <button
            onClick={() => navigate("/teacherappointments")}
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition border"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">Appointment Requests</h2>
            <p className="text-gray-600 text-sm">Approve or reject student requests</p>
          </button>

          <button
            onClick={() => navigate("/teachers")}
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition border"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Teacher Page</h2>
            <p className="text-gray-600 text-sm">View all teachers (public page)</p>
          </button>
        </div>

        {/* Incoming Appointments */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recent Appointment Requests
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-600">
            No appointment requests yet.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {a.studentName}
                </h3>
                <p className="text-gray-700 mt-1">
                  📅 {a.date} &nbsp; ⏰ {a.time}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Message: {a.message || "No message"}
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

export default TeacherDashboard;
