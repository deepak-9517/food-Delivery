import { useContext, useEffect, useState } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDelivery.css";
import { StoreContext } from "../ContextApi/Context";
import { GetFoodList } from "../../api_function";

const FoodDelivery = ({ menu }) => {
  const { food_list, apiData } = useContext(StoreContext);

  return (
    <div className="fooddelivery col-md-12">
      <h2>Top dishes near you</h2>
      <div className="food-item row mt-5">
        {apiData?.map((item, index) => {
          if (menu === "All" || menu === item.category) {
            return (
              <FoodItem
                id={item._id}
                price={item.price}
                description={item.description}
                image={item.image}
                name={item.name}
                key={item._id}
              />
            );
          }
        })}
      </div>
      {/* <div className="pagination-container float-end mt-5">
        <button
          className="btn btn-dark btn-lg"
          onClick={() => setCurrentPage((pre) => pre - 1)}
          disabled={currentPage == 1 ? true : false}
        >
          Previous
        </button>
        <button
          className="btn btn-dark btn-lg ms-1"
          onClick={() => setCurrentPage((pre) => pre + 1)}
          disabled={currentPage == totalPages ? true : false}
        >
          Next
        </button>
        <span className="ms-3">{`${currentPage} to ${totalPages}`}</span>
      </div> */}
    </div>
  );
};
export default FoodDelivery;
