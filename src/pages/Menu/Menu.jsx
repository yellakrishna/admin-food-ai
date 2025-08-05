import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../assets/assets";
import "./Menu.css";

const Menu = () => {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setFoods(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="menu-container">
      {foods.map((food) => (
        <div key={food._id} className="food-card">
          <img
            src={food.image}
            alt={food.name}
            className="food-image"
          />
          <div className="food-details">
            <h3>{food.name}</h3>
            <p className="food-description">{food.description}</p>
            <span className="food-price">₹{food.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
