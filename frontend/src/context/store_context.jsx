// store_context.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [food_list, setFoodlist] = useState([]);

  // ✅ Fetch food list from backend
  const get_data = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");
      setFoodlist(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    }
  };

  useEffect(() => {
    get_data();
  }, []);

  // ✅ Persist token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // ✅ Load cart data from backend
  const loadCartData = async (currentToken) => {
    try {
      const response = await axios.get("http://localhost:4000/api/cart/list", {
        headers: { Authorization: currentToken },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  // ✅ Restore token and fetch cart on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      loadCartData(savedToken);
    }
  }, []);

  // ✅ Keep cart in sync when token changes
  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  // ✅ Add to cart
  const addtoCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(
          "http://localhost:4000/api/cart/add",
          { itemId },
          { headers: { Authorization: token } }
        );
        await loadCartData(token); // refresh cart from backend
      } catch (err) {
        console.error("Failed to add item:", err);
      }
    }
  };

  // ✅ Remove from cart
  const removefromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          "http://localhost:4000/api/cart/remove",
          { itemId },
          { headers: { Authorization: token } }
        );
        await loadCartData(token); // refresh cart from backend
      } catch (err) {
        console.error("Failed to remove item:", err);
      }
    }
  };

  // ✅ Safe subtotal calculation
  const subtotal = Array.isArray(food_list)
    ? food_list.reduce((acc, item) => {
        const quantity = cartItems?.[item._id] || 0;
        return acc + quantity * item.price;
      }, 0)
    : 0;

  const deliveryFee = subtotal > 0 ? 50 : 0;
  const totalAmount = subtotal + deliveryFee;

  const contextValue = {
    food_list,
    cartItems,
    addtoCart,
    removefromCart,
    subtotal,
    deliveryFee,
    totalAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
