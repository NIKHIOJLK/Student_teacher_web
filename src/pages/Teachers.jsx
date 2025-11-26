// src/pages/Teachers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/api/teachers");

      if (Array.isArray(res.data)) {
        setTeachers(res.data);
        setFiltered(res.data);
      } else {
        console.error("ERROR: teachers API did NOT return array");
        setTeachers([]);
        setFiltered([]);
      }
    } catch (err) {
      console.error("Teacher fetch error:", err);
      setTeachers([]);
      setFiltered([]);
    }
  };

  // Fetch availability for each teacher
const fetchAvailabilityForTeachers = async () => {
  try {
    let map = {};

    for (const t of teachers) {
      const res = await axios.get(`/api/availability/${t._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = Array.isArray(res.data) ? res.data : [];

      // filter next 7 days
      const next7 = data.filter((slot) => {
        const now = new Date();
        const slotDate = new Date(slot.date);
        const diff = (slotDate - now) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      });

      map[t._id] = next7.slice(0, 2);
    }

    setAvailability(map);
  } catch (err) {
    console.error("Availability fetch error:", err);
  }
};


  // Initial load
  useEffect(() => {
    fetchTeachers();
  }, []);

  // load availability after teachers arrive
  useEffect(() => {
    if (teachers.length > 0) {
      fetchAvailabilityForTeachers().then(() => setLoading(false));
    }
  }, [teachers]);

  // Search filter
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(teachers);
      return;
    }

    const s = search.toLowerCase();
    setFiltered(
      teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(s) ||
          t.department.toLowerCase().includes(s)
      )
    );
  }, [search, teachers]);

  if (loading) {
    return (
      <p className="text-center p-10 text-lg text-gray-700">
        Loading teachers...
      </p>
    );
  }

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Teachers</h1>

      <div className="max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Search by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border rounded-full shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No teachers match your search.
          </p>
        ) : (
          filtered.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-gray-600 mt-1">{teacher.department}</p>

              <h3 className="mt-4 text-lg font-semibold text-indigo-700">
                Upcoming Availability
              </h3>

              {availability[teacher._id]?.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {availability[teacher._id].map((slot) => (
                    <li key={slot._id} className="p-3 bg-indigo-50 rounded-xl border text-sm">
                      <div>Date: <b>{slot.date}</b></div>
                      <div>{slot.startTime} – {slot.endTime}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2 text-sm">No upcoming slots.</p>
              )}

              <button
                className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
                onClick={() => navigate(`/teachers/${teacher._id}`)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Teachers;
