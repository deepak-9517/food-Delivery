import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../ContextApi/Context";
import { useNavigate } from "react-router-dom";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Navbar({ setLoginPopup }) {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { cartItems, jwtToken, setJwtToken } = useContext(StoreContext);

  const Logout = () => {
    localStorage.removeItem("token");
    setJwtToken(null);
    setLoginPopup(false);
  };
  return (
    <div className="navbar" style={{ zIndex: "10" }}>
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li
            onClick={() => setMenu("home")}
            className={menu == "home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <li
          onClick={() => setMenu("menu")}
          className={menu == "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("mobile")}
          className={menu == "mobile" ? "active" : ""}
        >
          Mobile-App
        </li>
        <li
          onClick={() => setMenu("contact")}
          className={menu == "contact" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" height="25" />
        <div
          className="navbar-search-icon"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          <img src={assets.basket_icon} alt="" height="25" />
          <div className={Object.keys(cartItems).length > 0 ? "dot" : ""}></div>
        </div>
        {!jwtToken ? (
          <button
            className="btn btn-secondary"
            onClick={() => setLoginPopup(true)}
          >
            Sign in
          </button>
        ) : (
          <>
            <div className="user-profile">
              <img src={assets.profile_icon} width={30} height={30} />
              <div className="list-item">
                <ul className="text-center">
                  <li className="d-flex justify-content-around">
                    <Link to="/orders">
                      <img src={assets.bag_icon} width={20} height={20} />
                      <span className="ms-2">Orders</span>
                    </Link>
                  </li>
                  <hr />
                  <li className="d-flex" onClick={Logout}>
                    <img src={assets.logout_icon} width={20} height={20} />
                    <span className="ms-2">Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
