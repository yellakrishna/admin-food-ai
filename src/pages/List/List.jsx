import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../assets/assets";
import "./List.css";
import { toast } from "react-toastify";

const List = () => {
  const [foods, setFoods] = useState([]);

  // Fetch foods
  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setFoods(res.data.data);
      }
    } catch (err) {
      console.error("❌ Failed to fetch food list:", err);
    }
  };

  // Remove food
  const removeFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;

    try {
      const res = await axios.post(`${url}/api/food/remove`, { id });
      if (res.data.success) {
        toast.success(res.data.message || "Food Removed");
        setFoods((prev) => prev.filter((food) => food._id !== id));
      } else {
        toast.error(res.data.message || "Failed to remove food");
      }
    } catch (error) {
      console.error("❌ Error removing food:", error);
      toast.error("Error removing food");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
        <div className="page-content">
    <div className="food-list">
      <h2 className="list-title">Food Items</h2>

      {/* Table View for PC */}
      <div className="table-container">
        <table className="food-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeFood(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="mobile-list">
        {foods.map((item) => (
          <div className="mobile-item" key={item._id}>
            <img src={item.image} alt={item.name} />
            <div className="mobile-info">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="price">₹{item.price}</p>
              <p className="desc">{item.description}</p>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeFood(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default List;
