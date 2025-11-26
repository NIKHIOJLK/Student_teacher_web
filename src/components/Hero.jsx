import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
      {/* Decorative circles */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-150px] w-[400px] h-[400px] bg-indigo-300 opacity-30 blur-3xl rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Tagline */}
        <p className="uppercase tracking-wide text-blue-600 font-medium mb-3 text-sm md:text-base">
          Your Academic Companion
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
          Connect. Learn. <span className="text-blue-700">Grow.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
          Book appointments, get guidance, and collaborate with your mentors —
          all in one place.
        </p>

        {/* Call-to-action Card */}
        <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-2xl mx-auto border border-gray-200">
          <input
            type="text"
            placeholder="Search teacher or department..."
            className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
          />
          <button
            onClick={() => navigate("/appointments")}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
