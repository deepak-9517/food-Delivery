import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets.js";
// import { assets } from "../../assets/assets";
const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      <div className="header-content">
        <h2>Order your favorite food here</h2>
        <p>
          Craving something delicious? You're in the right place! At, we bring
          the best local restaurants straight to your door. Whether you're in
          the mood for a quick bite, a hearty meal, or something special, we've
          got you covered.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
