// src/pages/Loginpage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import thaparlogo from "../assets/thaparlogo.png";

const API_URL = import.meta.env.VITE_API_URL;

const Loginpage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student"); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      // 🔥 FIXED ENDPOINT
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, name, email, role: returnedRole, user } = res.data;

      if (!token) {
        alert("Login failed: no token returned");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("name", name || user?.name || "");
      localStorage.setItem("email", email || user?.email || "");
      localStorage.setItem("role", returnedRole || user?.role || "");

      const finalRole = returnedRole || user?.role;

      if (finalRole === "teacher") navigate("/teacher/dashboard");
      else if (finalRole === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left */}
      <div className="flex-1 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-600 text-white flex flex-col justify-center items-center p-10">
        <img src={thaparlogo} alt="logo" className="w-24 mb-6 bg-white rounded-full p-2" />
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Thapar Portal</h1>
        <p className="text-lg text-center text-blue-100 max-w-md">
          Schedule meetings, clarify doubts, and collaborate efficiently.
        </p>
      </div>

      {/* Right */}
      <div className="flex-1 bg-white flex flex-col justify-center px-8 md:px-20 py-16">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          {/* Role buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => setRole("student")}
              className={`px-6 py-2 rounded-full text-sm font-medium border ${
                role === "student"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Student
            </button>
            <button onClick={() => setRole("teacher")}
              className={`px-6 py-2 rounded-full text-sm font-medium border ${
                role === "teacher"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Teacher
            </button>
            <button onClick={() => setRole("admin")}
              className={`px-6 py-2 rounded-full text-sm font-medium border ${
                role === "admin"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-700">Email Address</label>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange}
                placeholder="example@thapar.edu"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-md"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
