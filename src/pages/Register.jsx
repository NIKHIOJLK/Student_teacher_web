import React, { useState } from "react";
import thaparlogo from "../assets/thaparlogo.png";

const Register = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all required fields!");
      return;
    }

    // Send data to backend
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Server error — check backend!");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-600 text-white flex flex-col justify-center items-center p-10">
        <img
          src={thaparlogo}
          alt="Thapar Logo"
          className="w-24 mb-6 bg-white rounded-full p-2"
        />
        <h1 className="text-4xl font-bold mb-4 text-center">
          Create Your Account
        </h1>
        <p className="text-lg text-center text-blue-100 max-w-md">
          Join the Thapar Portal and manage your academic appointments easily.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white flex flex-col justify-center px-8 md:px-20 py-16">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Register
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setRole("student")}
              className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                role === "student"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("teacher")}
              className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                role === "teacher"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              Teacher
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@thapar.edu"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Department (only for teachers) */}
            {role === "teacher" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  placeholder="CSE / ECE / Mechanical / Math etc."
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
