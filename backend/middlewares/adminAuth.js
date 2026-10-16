import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Admin authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }
    return next();
  } catch (error) {
    console.error("Admin authentication failed:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired admin token" });
  }
};

export default adminAuth;
