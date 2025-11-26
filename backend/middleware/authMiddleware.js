// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded now includes { id, role, name, email } because we set it on login
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name || "",
      email: decoded.email || "",
    };
    next();
  } catch (err) {
    console.error("protect middleware error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Not authorized" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: Role not allowed" });
    }
    next();
  };
};
  