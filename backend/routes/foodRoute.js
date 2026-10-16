import express from "express";
import { addFood, listFood, deleteFood } from "../controllers/foodcontroller.js";
import multer from "multer";
import adminAuth from "../middlewares/adminAuth.js";
import { uploadsDir } from "../config/uploads.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", adminAuth, upload.single("image"), addFood);
foodRouter.get("/list", listFood);   
foodRouter.post("/delete", adminAuth, deleteFood);

export default foodRouter;
