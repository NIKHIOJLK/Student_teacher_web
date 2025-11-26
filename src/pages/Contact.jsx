import React, { useState } from "react";
import thaparlogo from "../assets/thaparlogo.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields before submitting.");
      return;
    }

    console.log("Message Sent:", formData);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      {/* Header */}
      <div className="text-center mb-14">
        <img
          src={thaparlogo}
          alt="Thapar Logo"
          className="w-20 mx-auto mb-4 bg-white rounded-full p-2 shadow-sm"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions, feedback, or issues? Fill out the form below and our
          team will get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl border border-gray-100 p-10">
        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium animate-fade-in">
            ✅ Message sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@thapar.edu"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your query or feedback here..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info Footer */}
      <div className="text-center mt-16 text-gray-600">
        <p>📍 Thapar Institute of Engineering & Technology, Patiala</p>
        <p>
          📧{" "}
          <a
            href="mailto:support@thapar.edu"
            className="text-blue-600 hover:underline"
          >
            support@thapar.edu
          </a>{" "}
          | ☎️ +91 172 239 3021
        </p>
      </div>
    </section>
  );
};

export default Contact;
