// src/pages/AddAvailability.jsx
import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AddAvailability = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.startTime || !formData.endTime) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/availability`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(true);

      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        notes: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.log(err);
      alert("Failed to save availability");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl border border-gray-100 p-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Add Availability
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
            Availability saved!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-1">Start Time *</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-1">End Time *</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full"
          >
            Save Availability
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAvailability;
