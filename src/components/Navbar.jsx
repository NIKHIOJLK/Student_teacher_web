// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/thaparlogo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (token && role) setUser({ name: name || role, role });
    else setUser(null);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getNavLinks = () => {
    if (!user) {
      return [
        { name: "Home", path: "/" },
        { name: "Teachers", path: "/teachers" },
        { name: "Contact", path: "/contact" },
      ];
    }

    if (user.role === "student") {
      return [
        { name: "Home", path: "/" },
        { name: "Teachers", path: "/teachers" },
        { name: "Dashboard", path: "/student/dashboard" },
        { name: "Book Appointment", path: "/book" },
        { name: "Contact", path: "/contact" },
        { name: "My Appointments", path: "/myappointments" },
      ];
    }

    if (user.role === "teacher") {
      return [
        { name: "Home", path: "/" },
        { name: "Teachers", path: "/teachers" },
        { name: "Dashboard", path: "/teacher/dashboard" },
        { name: "Add Availability", path: "/addavailability" },
        { name: "Appointments", path: "/teacherappointments" },
        { name: "Contact", path: "/contact" },
      ];
    }

    if (user.role === "admin") {
      return [
        { name: "Admin Dashboard", path: "/admin/dashboard" },
        { name: "Users", path: "/admin/users" },
        { name: "Appointments", path: "/admin/appointments" },
      ];
    }
  };

  const navLinks = getNavLinks() || [];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900"}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center py-4 md:py-5">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-10" alt="logo" />
          <h1 className={`text-xl md:text-2xl font-semibold ${isScrolled ? "text-gray-900" : "text-white"}`}>
            Thapar Portal
          </h1>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-700"
                  : "text-white hover:text-blue-200"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <span className={isScrolled ? "text-gray-900" : "text-white"}>
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
