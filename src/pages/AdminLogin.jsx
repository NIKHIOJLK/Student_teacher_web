// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import thaparlogo from "../assets/thaparlogo.png";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // 🔥 FIXED LOGIN URL
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const { token, name, email, role } = res.data;

      if (!token) {
        setMsg("Login failed: No token received");
        setLoading(false);
        return;
      }

      // Save auth details globally
      localStorage.setItem("token", token);
      localStorage.setItem("name", name || "");
      localStorage.setItem("email", email || "");
      localStorage.setItem("role", role || "");

      // Redirect based on actual role returned from backend
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "teacher") navigate("/teacher/dashboard");
      else navigate("/student/dashboard");

    } catch (err) {
      const m =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed";
      setMsg(m);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 flex justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full border border-gray-200">

        <div className="text-center mb-6">
          <img
            src={thaparlogo}
            alt="logo"
            className="w-20 mx-auto mb-4 bg-white rounded-full p-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
        </div>

        {msg && (
          <div
            className={`mb-4 p-3 rounded text-center ${
              msg.toLowerCase().includes("fail")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="admin@thapar.edu"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-full font-semibold hover:scale-[1.02] transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
