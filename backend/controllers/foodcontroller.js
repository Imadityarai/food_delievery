import foodmodel from "../models/food_models.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const image_filename = req.file.filename;

    const food = new foodmodel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const food_list = await foodmodel.find({});
    res.json({ success: true, data: food_list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching food list" });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food_del = await foodmodel.findById(req.body.id);
    if (!food_del) {
      return res.status(404).json({ success: false, msg: "Food not found" });
    }

    // Safely delete image file
    try {
      await fs.promises.unlink(`uploads/${food_del.image}`);
    } catch (err) {
      console.warn("Image file not found:", err.message);
    }

    await foodmodel.findByIdAndDelete(req.body.id);
    res.json({ success: true, msg: "food_removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Error deleting food" });
  }
};

export { addFood, listFood, deleteFood };
