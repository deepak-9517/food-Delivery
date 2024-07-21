import React, { useEffect, useState } from "react";
import "./Orders.css";
import { assets } from "../../../assets/assets";
import { changeOrderStatus, getAllOrders } from "../../api_function";
const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await getAllOrders();
        if (res) {
          setMyOrders(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, []);

  const Order = async (status, id) => {
    try {
      await changeOrderStatus(status, id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-orders mt-5">
      <div className="container-fluid">
        <h2>My Orders</h2>
        <div className="all-orders mt-5 col-12">
          {myOrders &&
            myOrders?.map((item, index) => (
              <div className="orders mt-3" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <p className="item-list">
                  {item?.items?.map((it, index) => (
                    <span className="" key={index}>
                      {it.name} x {it.quantity},
                    </span>
                  ))}
                  {/* {item?.address?.map((it, index) => {
                    return (
                      <> */}
                  <div className="mt-4">
                    {item?.address?.fname} {item?.address?.lname}
                    <span>{item?.address?.streat}</span>
                    <br />
                    <span>
                      {item?.address?.city}{" "}
                      <span>
                        <br />
                        {item?.address?.state} {item?.address?.country}{" "}
                        {item?.address?.pincode}
                      </span>
                      <br />
                    </span>
                    <span>{item?.address?.phone}</span>
                  </div>

                  {/* </>
                    );
                  })} */}
                </p>
                <p>${item?.amount}.00</p>
                <p>item:{item?.items?.length}</p>
                <button className="tract-order">
                  <select
                    name="order-status"
                    id=""
                    className="form-control"
                    onChange={(e) => Order(e.target.value, item?._id)}
                  >
                    <option
                      value="Food Processing"
                      selected={
                        item?.status === "Food Processing" ? true : false
                      }
                    >
                      Food Processing
                    </option>
                    <option
                      value="Delivered"
                      selected={item?.status === "Delivered" ? true : false}
                    >
                      Delivered
                    </option>
                    <option
                      value="Out Of Stock"
                      selected={item?.status === "Out Of Stock" ? true : false}
                    >
                      Out Of Stock
                    </option>
                    <option
                      value="Order Cancel"
                      selected={item?.status === "Order Cancel" ? true : false}
                    >
                      Order Cancel
                    </option>
                  </select>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
