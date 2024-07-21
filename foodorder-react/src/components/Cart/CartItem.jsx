import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../ContextApi/Context";
import { assets } from "../../assets/assets";
import { url2 } from "../../api_function";
import { Link } from "react-router-dom";
export default function CartItem() {
  const { apiData, cartItems, removeCartItems, addCartItems, getFoodAmt } =
    useContext(StoreContext);

  // const [deliveryFess, setDeliveryFess] = useState(2);

  return (
    <>
      <div className="cartitem">
        <div className="cart-item-list">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, index) => {
                let t = 0;
                if (cartItems[item._id]) {
                  return (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`${url2}/${item.image}`}
                          height="50"
                          width="50"
                        />
                      </td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>{cartItems[item._id]}</td>
                      <td>${item.price * cartItems[item._id]}</td>
                      <td>
                        <div>
                          <img
                            src={assets.remove_icon_red}
                            alt=""
                            onClick={() => removeCartItems(item._id)}
                          />
                          <span className="ms-2 me-2">
                            {cartItems[item._id]}
                          </span>
                          <img
                            src={assets.add_icon_green}
                            alt=""
                            onClick={() => addCartItems(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-12 carts-total">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p>If you have a promo code, Enter it here</p>
                <form className="promo-code-form">
                  <input
                    type="text"
                    placeholder="Promo code"
                    name="promoCode"
                    className="promo-card-input"
                  />
                  <input type="submit" value="Submit" />
                </form>
              </div>
              <div className="col-md-6 col-sm-12 checkout-section">
                <h2>Cart Totals</h2>
                <p className="d-flex justify-content-between mt-5">
                  Subtotal<span className="cart-price">${getFoodAmt()}</span>
                </p>
                <hr />
                <p className="d-flex justify-content-between">
                  Delivery Fee
                  <span className="cart-price">${getFoodAmt() ? 2 : 0}</span>
                </p>
                <hr />
                <p className="d-flex justify-content-between mb-5">
                  Total
                  <span className="cart-price">
                    ${getFoodAmt() + (getFoodAmt() ? 2 : 0)}
                  </span>
                </p>

                <Link to="/place-order" className="checkout-process mt-5">
                  PROCESS TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
