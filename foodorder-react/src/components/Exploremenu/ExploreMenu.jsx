import React, { useState } from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";
const ExploreMenu = ({ menuItem, setMenuItem }) => {
  const [selectItem, setSelectItem] = useState();

  return (
    <div className="explore-menu">
      <h2>Explore our menu</h2>
      <p>
        Craving something delicious? You're in the right place! At, we bring the
        best local restaurants straight to your door. Whether you're in the mood
        for a quick bite, a hearty meal, or something special, we've got you
        covered.
      </p>
      <div className="menu-list">
        {menu_list &&
          menu_list.map((item, index) => {
            return (
              <div
                className="menu-item"
                key={index}
                onClick={() =>
                  setMenuItem((pre) =>
                    pre === item.menu_name ? "All" : item.menu_name
                  )
                }
              >
                <img
                  src={item.menu_image}
                  alt=""
                  className={menuItem === item.menu_name ? "active" : ""}
                />
                <p className="mt-3">{item.menu_name}</p>
              </div>
            );
          })}
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default ExploreMenu;
