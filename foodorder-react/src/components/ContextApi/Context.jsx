import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/assets";
import { GetFoodList, url } from "../../api_function";
import axios from "axios";
import { toast } from "react-toastify";
export const StoreContext = createContext();

const FoodContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [jwtToken, setJwtToken] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [cartResponse, setCartResponse] = useState(false);
  // const [totalPages, setTotalPages] = useState(1);

  const addCartItems = async (id) => {
    try {
      const res = await axios.post(
        `${url}cart/add`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setCartResponse(!cartResponse);
      if (res?.data?.status !== 200) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItems = async (id) => {
    try {
      const res = await axios.post(
        `${url}cart/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setCartResponse(!cartResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartalist = async (jwt) => {
    try {
      const res = await axios.post(
        `${url}cart/get-cart`,
        { id: "132" },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setCartItems(res?.data?.cartData);
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodAmt = () => {
    return apiData.reduce((pre, it) => {
      if (cartItems[it._id]) {
        return pre + cartItems[it._id] * it.price;
      }
      return pre;
    }, 0);
  };

  async function getApiData() {
    try {
      const res = await GetFoodList();
      if (res) {
        setApiData(res?.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setJwtToken(localStorage.getItem("token"));
    }
    getApiData();
  }, []);

  useEffect(() => {
    async function getLoadData() {
      if (localStorage.getItem("token")) {
        setJwtToken(localStorage.getItem("token"));
        await getCartalist(localStorage.getItem("token"));
      }
    }
    getLoadData();
  }, [cartResponse]);

  const foodItem = {
    food_list,
    cartItems,
    removeCartItems,
    addCartItems,
    getFoodAmt,
    setJwtToken,
    jwtToken,
    apiData,
    // setCurrentPage,
    // totalPages,
    // currentPage,
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);
  return (
    <StoreContext.Provider value={foodItem}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default FoodContextProvider;
