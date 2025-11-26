// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import TeacherDetails from "./pages/TeacherDetails";
import Contact from "./pages/Contact";

import Login from "./pages/Loginpage";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import BookAppointment from "./pages/BookAppointment";

import TeacherDashboard from "./pages/TeacherDashboard";
import AddAvailability from "./pages/AddAvailability";
import TeacherAppointments from "./pages/TeacherAppointments";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";
import AdminAppointments from "./pages/AdminAppointments";

import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/:id" element={<TeacherDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute allowedRole="admin"><AdminAppointments /></ProtectedRoute>} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute allowedRole="student"><BookAppointment /></ProtectedRoute>} />
        <Route path="/myappointments" element={<ProtectedRoute allowedRole="student"><MyAppointmentsPage /></ProtectedRoute>} />

        {/* TEACHER */}
        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/addavailability" element={<ProtectedRoute allowedRole="teacher"><AddAvailability /></ProtectedRoute>} />
        <Route path="/teacherappointments" element={<ProtectedRoute allowedRole="teacher"><TeacherAppointments /></ProtectedRoute>} />

        {/* SHARED */}
        <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
