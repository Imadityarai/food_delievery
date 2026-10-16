import { timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";

const matchesSecret = (provided, configured) => {
  if (typeof provided !== "string") {
    return false;
  }
  const providedBuffer = Buffer.from(provided);
  const configuredBuffer = Buffer.from(configured || "");
  return providedBuffer.length === configuredBuffer.length
    && timingSafeEqual(providedBuffer, configuredBuffer);
};

const loginAdmin = (req, res) => {
  const { username, password } = req.body;
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return res.status(503).json({ success: false, message: "Admin login is not configured" });
  }

  if (!matchesSecret(username, ADMIN_USERNAME) || !matchesSecret(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  return res.json({ success: true, token });
};

export { loginAdmin };
