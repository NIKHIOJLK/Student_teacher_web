// backend/controllers/authController.js
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Please fill all fields" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      department: role === "teacher" ? department : "",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
      },
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// LOGIN - checks Users first, then Admins
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Please provide email and password" });

    // try regular user
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

      const token = jwt.sign(
        { id: user._id, role: user.role, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        },
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }

    // If not a User, try Admin
    const admin = await Admin.findOne({ email });
    if (admin) {
      const isMatchAdmin = await bcrypt.compare(password, admin.password);
      if (!isMatchAdmin) return res.status(400).json({ error: "Invalid email or password" });

      const token = jwt.sign(
        { id: admin._id, role: "admin", name: admin.email, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Admin login successful",
        token,
        user: {
          id: admin._id,
          name: admin.email,
          email: admin.email,
          role: "admin",
        },
        name: admin.email,
        email: admin.email,
        role: "admin",
      });
    }

    return res.status(400).json({ error: "Invalid email or password" });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// GET TEACHER BY ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id).select("-password");
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    if (teacher.role !== "teacher") return res.status(400).json({ error: "User is not a teacher" });

    res.json({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role,
      department: teacher.department,
    });
  } catch (err) {
    console.error("getTeacherById error:", err);
    res.status(500).json({ error: "Failed to load teacher details" });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    return res.json(teachers);  // 👈 MUST RETURN ARRAY
  } catch (err) {
    console.error("getAllTeachers error:", err);
    return res.status(500).json({ error: "Failed to fetch teachers" });
  }
};



// GET /api/auth/me - profile of logged in user (student/teacher/admin)
export const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    if (req.user.role === "admin") {
      const admin = await Admin.findById(userId).select("-password");
      if (!admin) return res.status(404).json({ error: "Admin not found" });
      return res.json({
        id: admin._id,
        name: admin.email,
        email: admin.email,
        role: "admin",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || "",
      phone: user.phone || "",
      rollNumber: user.rollNumber || "",
    });
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ error: "Failed to load profile" });
  }
};

// PUT /api/auth/update - update logged-in user's editable fields
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const { name, department, phone } = req.body;

    if (req.user.role === "admin") return res.status(403).json({ error: "Admin cannot update this endpoint" });

    const updates = {};
    if (typeof name === "string") updates.name = name.trim();
    if (typeof department === "string") updates.department = department.trim();
    if (typeof phone === "string") updates.phone = phone.trim();

    const updated = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select("-password");
    if (!updated) return res.status(404).json({ error: "User not found" });

    return res.json({
      id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      department: updated.department || "",
      phone: updated.phone || "",
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  }
};
