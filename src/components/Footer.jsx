import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/thaparlogo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 - About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Thapar Logo"
              className="h-10 w-auto bg-white rounded-md p-1"
            />
            <h2 className="text-2xl font-semibold">Thapar Portal</h2>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
            A smart digital platform for Thapar students and teachers to
            collaborate, schedule, and grow together.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>
              <NavLink
                to="/"
                className="hover:text-white transition-all duration-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teachers"
                className="hover:text-white transition-all duration-300"
              >
                Teachers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className="hover:text-white transition-all duration-300"
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="hover:text-white transition-all duration-300"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <p className="text-gray-200 text-sm mb-3">
            <FaEnvelope className="inline mr-2 text-blue-200" />
            support@thapar.edu
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              <FaFacebook className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              <FaLinkedin className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              <FaInstagram className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Thapar Institute of Engineering &
        Technology — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
