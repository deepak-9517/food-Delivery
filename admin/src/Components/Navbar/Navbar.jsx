import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="left ms-5">
            <img src={assets.logo} alt="" />
          </div>
          <div className="right me-5">
            <img src={assets.profile_image} alt="" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
