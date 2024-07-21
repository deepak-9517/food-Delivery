import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../ContextApi/Context";
import { countries } from "countries-list";
import { OrderPlace } from "../../api_function";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getFoodAmt, jwtToken, apiData, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState({
    fname: "",
    lname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const foodAmt = getFoodAmt();
  const countryNames = Object.keys(countries).map(
    (code) => countries[code].name
  );

  function handleInput(e) {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let orderItem = [];
    apiData.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItem.push(itemInfo);
      }
    });
    const orderData = {
      address: userDetail,
      item: orderItem,
      amount: getFoodAmt() + 2,
    };

    const res = await OrderPlace(orderData, jwtToken);
    console.log(res.data.session_id, "placeorder");
    if (res.data.status === 200) {
      // const { session_id } = res.data.session_url;
      window.location.replace(res.data.session_url);
    }
  }

  useEffect(() => {
    if (Object.keys(cartItems).length <= 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  return (
    <>
      <div className="order mt-5">
        <div className="col-12">
          {/* <div className="container"> */}
          <div className="row">
            <div className="col-md-6 col-sm-12 mb-5">
              <div className="delivery-main">
                <form class="row g-3" onSubmit={handleSubmit}>
                  <h2 className="mb-5">Delivery Information</h2>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="fname"
                      placeholder="First name"
                      onChange={handleInput}
                      value={userDetail.fname}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="lname"
                      placeholder="Last name"
                      onChange={handleInput}
                      value={userDetail.lname}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      name="email"
                      onChange={handleInput}
                      value={userDetail.email}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street"
                      name="street"
                      onChange={handleInput}
                      value={userDetail.street}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      onChange={handleInput}
                      value={userDetail.city}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      placeholder="State"
                      onChange={handleInput}
                      value={userDetail.state}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      name="pincode"
                      placeholder="Pincode"
                      onChange={handleInput}
                      value={userDetail.pincode}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    {/* <input
                      type="text"
                      className="form-control"
                      name="country"
                      placeholder="Coutry"
                    /> */}
                    <select
                      className="form-control"
                      onChange={handleInput}
                      name="country"
                      required
                    >
                      <option value="">---please select---</option>
                      {countryNames.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleInput}
                      value={userDetail.phone}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="cart-main float-end   ">
                <h2>Cart Total</h2>
                <div className="mt-5 d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${foodAmt}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Delivery Fee</span>
                  <span>${foodAmt ? 2 : 0}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fs-5">Total</span>
                  <span>${foodAmt ? foodAmt + 2 : 0}</span>
                </div>
                <button
                  className="checkout-process mt-5"
                  onClick={handleSubmit}
                  type="submit"
                >
                  PROCESS TO PAYMENT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default PlaceOrder;
