import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import logo from "/logo-design.jpg";
import food from "/veg.png";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">🐟 Fish Delivery</div>

      <nav className="sidebar-options">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.add_icon} alt="Add" />
          <span>Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.order_icon} alt="List" />
          <span>List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.order_icon} alt="Orders" />
          <span>Orders</span>
        </NavLink>
          <NavLink
          to="/Menu"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={food} alt="Orders" className="fishs" />
          <span>Menu</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
