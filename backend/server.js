import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { uploadsDir } from "./config/uploads.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const configuredOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

if (process.env.NODE_ENV === "production" && configuredOrigins.length === 0) {
  throw new Error("CLIENT_ORIGINS must contain the deployed frontend origin in production");
}

const allowedOrigins = configuredOrigins.length > 0
  ? configuredOrigins
  : ["http://localhost:5173", "http://localhost:5174"];

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in the environment");
}

// Middleware
app.use(cors({
  origin(origin, callback) {
    const normalizedOrigin = origin?.trim().replace(/\/+$/, "");
    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    console.warn("CORS rejected origin", {
      origin: normalizedOrigin,
      allowedOrigins,
    });
    const error = new Error("Origin not allowed by CORS");
    error.status = 403;
    return callback(error);
  },
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Database connection
await connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/images", express.static(uploadsDir));
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.json({ success: true, message: "Food delivery API is running" });
});

app.use((error, req, res, next) => {
  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({ success: false, message: error.message });
  }
  console.error(error);
  return res.status(error.status || 500).json({ success: false, message: "Internal server error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
