import React from "react";
import "./Navbar.css";
import logo from "/logo-design.jpg";
import fish from "/beautiful-fish.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo + Title */}
      <div className="navbar-left">
        <img className="navbar-logo" src={fish} alt="Fish Delivery" />
        <h1 className="navbar-title">Fish Delivery</h1>
      </div>

      {/* Right: Profile */}
      <div className="navbar-right">
        <img className="navbar-profile" src={logo} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
