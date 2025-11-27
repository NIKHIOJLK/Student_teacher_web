// src/pages/TeacherAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const TeacherAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacherName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  // Fetch all appointments for this teacher
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/appointments/teacher?teacher=${teacherName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching teacher appointments:", err);
      alert("Failed to load your appointment requests.");
    } finally {
      setLoading(false);
    }
  };

  // Teacher updates appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/appointments/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchAppointments(); // refresh list
    } catch (err) {
      alert("Failed to update status");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-600">
        Loading your appointment requests...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Incoming Student Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No appointment requests yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-100">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Student Email</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a._id}
                    className="border-t border-gray-100 hover:bg-indigo-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">{a.studentName}</td>
                    <td className="px-6 py-4">{a.studentEmail}</td>
                    <td className="px-6 py-4">{a.date}</td>
                    <td className="px-6 py-4">{a.time}</td>
                    <td className="px-6 py-4 italic text-gray-600">
                      {a.message || "—"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          a.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : a.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : a.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center space-x-3">
                      {/* Approve/Reject */}
                      {a.status === "Pending" && (
                        <>
                          <button
                            className="px-4 py-1 bg-green-600 text-white rounded-full text-sm hover:bg-green-700"
                            onClick={() => updateStatus(a._id, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="px-4 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700"
                            onClick={() => updateStatus(a._id, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {/* Mark Completed */}
                      {a.status === "Approved" && (
                        <button
                          className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                          onClick={() => updateStatus(a._id, "Completed")}
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherAppointments;
