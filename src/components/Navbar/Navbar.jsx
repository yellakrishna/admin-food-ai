import React from "react";
import "./Navbar.css";
import logo from "/logo-design.jpg";
import food from "/veg.png";


const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo + Title */}
      <div className="navbar-left">
        <img className="navbar-logo" src={food} alt="Fish Delivery" />
        <h1 className="navbar-title">Admin Panel</h1>
      </div>

      {/* Right: Profile */}
      <div className="navbar-right">
        <img className="navbar-profile" src={logo} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
