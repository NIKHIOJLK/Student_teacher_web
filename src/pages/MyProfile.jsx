// src/pages/MyProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

/*
 If you want the logo to use an uploaded file path (tooling will transform it to a URL),
 keep the LOGO_URL below. Otherwise replace logoSrc with an import:
   import thaparlogo from "../assets/thaparlogo.png";
*/
const LOGO_URL = "/mnt/data/536f363f-3afa-423b-8970-6d4e120580cb.png";

const MyProfile = () => {
  const [user, setUser] = useState(null);      // server-returned user object
  const [temp, setTemp] = useState({           // editable copy
    name: "",
    department: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");          // success or error message

  const token = localStorage.getItem("token");
  const logoSrc = LOGO_URL; // or import a static asset instead

  // Load profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        // Normalize fields & set state
        setUser(data);
        setTemp({
          name: data.name || "",
          department: data.department || "",
          phone: data.phone || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
        setMsg("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Input handler
  const handleChange = (e) => {
    setTemp((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      // Build body with allowed fields only
      const body = {
        name: temp.name,
        department: temp.department,
        phone: temp.phone,
      };

      const res = await axios.put("/api/auth/update", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setEditing(false);

      // Update localStorage for Navbar / quick UI
      if (res.data.name) localStorage.setItem("name", res.data.name);
      if (res.data.department) localStorage.setItem("department", res.data.department);
      if (res.data.phone) localStorage.setItem("phone", res.data.phone);

      setMsg("Profile updated successfully.");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      const serverMsg = err.response?.data?.error || err.response?.data?.message;
      setMsg(serverMsg || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No profile found — please log in.</p>
      </div>
    );
  }

  const isStudent = user.role === "student";
  const isTeacher = user.role === "teacher";

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl border border-gray-100 p-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logoSrc}
            alt="logo"
            className="w-20 h-20 bg-white rounded-full p-2 shadow-sm mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 text-sm">Manage your account details</p>
        </div>

        {/* Message */}
        {msg && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              msg.toLowerCase().includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {msg}
          </div>
        )}

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            {editing ? (
              <input
                name="name"
                value={temp.name}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            ) : (
              <p className="text-gray-800 font-medium">{user.name}</p>
            )}
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-800 font-medium">{user.email}</p>
          </div>

          {/* Role (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className="text-gray-800 font-medium capitalize">{user.role}</p>
          </div>

          {/* Department / Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department / Branch</label>
            {editing ? (
              <input
                name="department"
                value={temp.department}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                placeholder={isStudent ? "e.g. Computer Science (CSE)" : "e.g. Computer Science"}
              />
            ) : (
              <p className="text-gray-800 font-medium">{user.department || "—"}</p>
            )}
          </div>

          {/* Roll Number — shown only for students and NOT editable */}
          {isStudent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <p className="text-gray-800 font-medium">{user.rollNumber || "—"}</p>
              <p className="text-xs text-gray-500 mt-1">
                Roll number cannot be changed by students. Contact admin to update it.
              </p>
            </div>
          )}

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            {editing ? (
              <input
                name="phone"
                value={temp.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="+91 98765 43210"
              />
            ) : (
              <p className="text-gray-800 font-medium">{user.phone || "—"}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => {
                    // cancel edits and reset temp
                    setTemp({
                      name: user.name || "",
                      department: user.department || "",
                      phone: user.phone || "",
                    });
                    setEditing(false);
                    setMsg("");
                  }}
                  className="bg-gray-200 px-6 py-3 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-3 rounded-full"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
