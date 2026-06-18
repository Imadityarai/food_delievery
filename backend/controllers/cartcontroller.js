import userModel from "../models/user_model.js";

// Add Item
const addtoCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, {
      cartData,
    });

    res.json({
      success: true,
      msg: "Added to Cart",
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      msg: "Error adding item",
    });
  }
};

// Remove Item
const remveFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.userId, {
      cartData,
    });

    res.json({
      success: true,
      msg: "Removed from Cart",
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      msg: "Error removing item",
    });
  }
};

// Fetch Cart
const fetchCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      msg: "Error fetching cart",
    });
  }
};

export { addtoCart, remveFromCart, fetchCart };