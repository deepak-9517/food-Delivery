import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../ContextApi/Context.jsx";
import { getMyOrders } from "../../api_function.js";
const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { jwtToken, getFoodAmt } = useContext(StoreContext);

  useEffect(() => {
    const getApiResponse = async () => {
      try {
        const res = await getMyOrders(jwtToken);
        if (res?.data?.status === 200) {
          setMyOrders(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApiResponse();
  }, [jwtToken]);

  const orderStatus = async () => {
    try {
      const res = await getMyOrders(jwtToken);
      if (res?.data?.status === 200) {
        setMyOrders(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-orders mt-5">
      <div className="container">
        <h2>My Orders</h2>
        <div className="all-orders mt-5 col-12">
          {myOrders &&
            myOrders?.map((item, index) => (
              <div className="orders mb-3" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <p className="item-list">
                  {item?.items?.map((it, index) => (
                    <span className="" key={index}>
                      {it.name} x {it.quantity},
                    </span>
                  ))}
                </p>
                <p>${item?.amount}.00</p>
                <p>item:{item?.items?.length}</p>
                <p>
                  <span>&#9679;</span>
                  {item?.status}
                </p>
                <button className="tract-order" onClick={orderStatus}>
                  Track Order
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
