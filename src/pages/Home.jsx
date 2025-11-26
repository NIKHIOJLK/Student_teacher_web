import React from "react";
import { useNavigate } from "react-router-dom";
import thaparlogo from "../assets/thaparlogo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-white overflow-hidden">
      {/* Floating Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-300/30 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <div className="text-center px-6 md:px-0 mt-24">
        <img
          src={thaparlogo}
          alt="Thapar Logo"
          className="mx-auto w-20 mb-6 animate-fade-in"
        />
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 tracking-tight leading-tight">
          Connect. Learn. <span className="text-blue-600">Grow.</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Book appointments, get guidance, and collaborate with your mentors —
          all in one place.
        </p>

        {/* Search/Action Box */}
        <div className="bg-white shadow-xl rounded-full flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto px-6 py-4 border border-gray-100">
          <input
            type="text"
            placeholder="Search teacher or department..."
            className="flex-1 outline-none text-gray-700 px-4 py-2 rounded-full w-full md:w-auto mb-3 md:mb-0"
          />
          <button
            onClick={() => navigate("/appointments")}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-32 w-full px-8 md:px-20 lg:px-40">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14">
          How It <span className="text-blue-600">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Book Easily
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Find your teacher, select a suitable time slot, and book an
              appointment instantly — no paperwork or delays.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Get Guidance
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Meet with your mentor to discuss academics, projects, or career
              guidance through scheduled sessions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Track Progress
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Stay updated with upcoming appointments and previous sessions in
              your personalized dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Footer tagline */}
      <p className="absolute bottom-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Thapar Institute of Engineering &
        Technology
      </p>
    </section>
  );
};

export default Home;
