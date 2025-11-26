// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [uRes, aRes] = await Promise.all([
          axios.get("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/admin/appointments", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setUsers(uRes.data || []);
        setAppointments(aRes.data || []);
      } catch (err) {
        console.error("AdminDashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const totalUsers = users.length;
  const totalStudents = users.filter(u => u.role === "student").length;
  const totalTeachers = users.filter(u => u.role === "teacher").length;
  const totalAppointments = appointments.length;
  const statusCounts = appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "Approved", value: statusCounts.Approved || 0 },
    { name: "Pending", value: statusCounts.Pending || 0 },
    { name: "Rejected", value: statusCounts.Rejected || 0 },
    { name: "Completed", value: statusCounts.Completed || 0 },
  ];

  const COLORS = ["#34D399", "#F59E0B", "#EF4444", "#9CA3AF"];

  const barData = [
    { name: "Students", value: totalStudents },
    { name: "Teachers", value: totalTeachers },
    { name: "Appointments", value: totalAppointments },
  ];

  if (loading)
    return <div className="min-h-screen flex justify-center items-center text-lg">Loading admin dashboard...</div>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-700 mt-4">{totalUsers}</p>
            <p className="text-sm text-gray-600 mt-2">Students: {totalStudents} • Teachers: {totalTeachers}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-sm text-gray-500">Total Appointments</h3>
            <p className="text-3xl font-bold text-indigo-700 mt-4">{totalAppointments}</p>
            <p className="text-sm text-gray-600 mt-2">Pending: {statusCounts.Pending || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-sm text-gray-500">Quick Actions</h3>
            <div className="mt-4 flex flex-col gap-3">
              <button className="py-2 px-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                onClick={() => (window.location.href = "/admin/users")}>
                View Users
              </button>
              <button className="py-2 px-4 rounded-full bg-white border"
                onClick={() => (window.location.href = "/admin/appointments")}>
                View Appointments
              </button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Appointment Status</h3>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Counts</h3>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
