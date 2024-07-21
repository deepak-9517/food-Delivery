import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [active, setActive] = useState("addItem");
  return (
    <>
      <div className="sidebar">
        <div className="side-options d-flex flex-column">
          <NavLink
            to="/add-item"
            className="option"
            onClick={() => setActive("addItem")}
          >
            <img src={assets.add_icon} alt="" />
            <span className="ms-3">Add Items</span>
          </NavLink>
          <NavLink
            to="/list-item"
            className="option"
            onClick={() => setActive("listItem")}
          >
            <img src={assets.order_icon} alt="" />
            <span className="ms-3">List Items</span>
          </NavLink>
          <NavLink
            to="/order-item"
            className="option"
            onClick={() => setActive("orderItem")}
          >
            <img src={assets.order_icon} alt="" />
            <span className="ms-3">Order Items</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
