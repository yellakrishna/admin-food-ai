import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../assets/assets";

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
    <div className="menu">
      {foods.map((food) => (
        <div key={food._id} className="food-card">
          {/* ✅ Cloudinary URL works directly */}
          <img
  src={food.image}
  alt={food.name}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px"
  }}
/>

          <h3>{food.name}</h3>
          <p>{food.description}</p>
          <span>₹{food.price}</span>
        </div>
      ))}
    </div>
  );
};

export default Menu;
