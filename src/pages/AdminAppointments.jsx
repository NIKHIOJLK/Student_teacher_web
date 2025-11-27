// src/pages/AdminAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminAppointments = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data || []);
    } catch (err) {
      console.error("load appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [token]);

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete(`${API_URL}/admin/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // remove from UI without reload
      setAppointments((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      alert("Failed to delete appointment");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading appointments...
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Appointments</h1>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-md overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500">
                <tr>
                  <th className="py-2">Student</th>
                  <th>Teacher</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id} className="border-t">
                    <td className="py-3">
                      {a.studentName}
                      <div className="text-xs text-gray-400">{a.studentEmail}</div>
                    </td>
                    <td>{a.teacher}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          a.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : a.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <button
                        className="px-4 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700"
                        onClick={() => deleteAppointment(a._id)}
                      >
                        Delete
                      </button>
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

export default AdminAppointments;
