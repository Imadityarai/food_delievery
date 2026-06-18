import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form submissions

// Database connection
await connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user",userRouter)
app.use("/images", express.static("uploads"));
app.use('/api/cart',cartRouter)
app.get("/", (req, res) => {
  res.send("App working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
