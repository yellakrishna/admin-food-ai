import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Boccha"
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📌 Form Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Client-side validations
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    if (!data.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }
    if (!data.description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!data.price || Number(data.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("image", image);

      // API call
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        toast.success(response.data.message || "Food Added Successfully");

        // Reset form
        setData({
          name: "",
          description: "",
          price: "",
          category: "Boccha"
        });
        setImage(null);
        document.getElementById("image").value = "";
      } else {
        toast.error(response.data.message || "Failed to add food");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding food");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Input Change Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-content">
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>

        {/* Category & Price */}
        <div className="add-category-price">
          {/* Category */}
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Boccha">Boccha</option>
              <option value="Dhu Bocha">Dhu Bocha</option>
              <option value="Rovu">Rovu</option>
              <option value="Valuga">Valuga</option>
              <option value="Murgam">Murgam</option>
              <option value="Matta">Matta</option>
              <option value="Nar Jalla">Nar Jalla</option>
              <option value="Royya">Royya</option>
            </select>
          </div>

          {/* Price */}
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="₹25"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Add;
