import axios from "axios";
export const url = "https://fooddelivery-backend-gj5x.onrender.com/api/";
export const url2 = "https://fooddelivery-backend-gj5x.onrender.com/image";
// export const url = "http://localhost:4040/api/";
// export const url2 = "http://localhost:4040/image";

export const Login = async (formData) => {
  try {
    const res = await axios.post(`${url}user/login`, formData);
    return res;
  } catch (error) {
    console.log("error in login()", error);
  }
};

export const Register = async (formData) => {
  try {
    const res = await axios.post(`${url}user/register`, formData);
    return res;
  } catch (error) {
    console.log("Error in register()", error);
  }
};

export const GetFoodList = async () => {
  try {
    const res = await axios.get(`${url}food/food-list`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const OrderPlace = async (orderItem, token) => {
  try {
    const res = await axios.post(`${url}order/place-order`, orderItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log("Error in placeorder()", error);
  }
};

export const Paymentverify = async (success, orderId) => {
  try {
    const res = await axios.post(`${url}order/verify`, { success, orderId });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyOrders = async (token) => {
  try {
    const res = await axios.get(`${url}order/user-order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
