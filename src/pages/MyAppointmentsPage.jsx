import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/appointments/my?email=${email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error loading appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [email, token]);

  if (loading)
    return <div className="p-6 text-center text-xl">Loading appointments...</div>;

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a._id} className="border p-4 rounded-xl shadow-sm bg-gray-50">
                <h2 className="font-semibold text-lg">
                  {a.teacher} — {a.department}
                </h2>
                <p>📅 Date: {a.date}</p>
                <p>⏰ Time: {a.time}</p>
                <p className="text-sm text-gray-600">
                  Message: {a.message || "—"}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    a.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : a.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : a.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
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

export default MyAppointmentsPage;
