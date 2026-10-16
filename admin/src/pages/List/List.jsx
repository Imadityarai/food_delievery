import { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { API_URL, imageUrl } from "../../config/api";

const List = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/food/list`);
        if (res.data.success) {
          setFoods(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching food list:", err);
      }
    };
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/api/food/delete`, { id }, {
        headers: { Authorization: localStorage.getItem('adminToken') },
      });
      if (res.data.success) {
        // remove from UI
        setFoods((prev) => prev.filter((food) => food._id !== id));
      } else {
        console.error("Delete failed:", res.data.msg);
      }
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  return (
    <div className="list-container">
      <h2>Food Items</h2>
      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food._id}>
            <button
              className="delete-btn"
              onClick={() => handleDelete(food._id)}
              title="Delete"
            >
              ✖
            </button>
            <img
              src={imageUrl(food.image)}
              alt={food.name}
              className="food-image"
            />
            <div className="food-info">
              <h3>{food.name}</h3>
              <p className="food-category">{food.category}</p>
              <p className="food-description">{food.description}</p>
              <p className="food-price">₹{food.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
