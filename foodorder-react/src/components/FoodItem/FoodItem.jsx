import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../ContextApi/Context";
import { url2 } from "../../api_function";
const FoodItem = ({ id, name, image, description, price }) => {
  // const [additem, setAdditem] = useState(0);
  const { cartItems, removeCartItems, addCartItems } = useContext(StoreContext);
  // console.log(setAddFood);
  return (
    <div
      className="card ms-4 me-4 mb-4"
      style={{ width: "18rem" }}
      key={id}
      id="single-food"
    >
      <img src={`${url2}/${image}`} className="card-img-top" alt={name} />
      <div className="card-body">
        <div className="add-food" style={{ cursor: "pointer" }}>
          {!cartItems[id] ? (
            <img
              src={assets.add_icon_white}
              className="float-end"
              onClick={() => addCartItems(id)}
            />
          ) : (
            <div className="d-flex">
              <img
                src={assets.remove_icon_red}
                onClick={() => removeCartItems(id)}
              />
              <p className="m-1 fs-5 ">{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                onClick={() => addCartItems(id)}
              />
            </div>
          )}
        </div>
        <div className="food-name-rating d-flex ">
          <h5 className="card-title fw-bold me-auto">{name}</h5>
          <img src={assets.rating_starts} alt="" className="food-rating mt-1" />
        </div>
        <p className="food-description">{description}</p>
        <h3>${price}</h3>
      </div>
    </div>
  );
};

export default FoodItem;
