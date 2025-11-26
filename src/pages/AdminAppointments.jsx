// src/pages/AdminAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/admin/appointments", { headers: { Authorization: `Bearer ${token}` } });
        setAppointments(res.data || []);
      } catch (err) {
        console.error("load appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading appointments...</div>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Appointments</h1>
        {appointments.length === 0 ? <p>No appointments found.</p> : (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500">
                <tr><th className="py-2">Student</th><th>Teacher</th><th>Date</th><th>Time</th><th>Status</th></tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a._id} className="border-t">
                    <td className="py-3">{a.studentName} <div className="text-xs text-gray-400">{a.studentEmail}</div></td>
                    <td>{a.teacher}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${a.status === "Approved" ? "bg-green-100 text-green-700" : a.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{a.status}</span>
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
