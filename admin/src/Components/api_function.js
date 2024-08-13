import axios from "axios";
const url = "https://fooddelivery-backend-gj5x.onrender.com/api";
export const url2 = "https://fooddelivery-backend-gj5x.onrender.com/image/";

export const getAllFoodList = async (page) => {
  try {
    const res = await axios.get(`${url}/food/food-list?page=${page}`);
    return res;
  } catch (error) {}
};

export const addFoodItem = async (formdata) => {
  try {
    const res = await axios.post(`${url}/food/add`, formdata);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFoodItem = async (id) => {
  try {
    const res = await axios.delete(`${url}/food/food-delete/${id}`);
    return res;
  } catch (error) {}
};

export const foodUpdate = async (id, formData) => {
  try {
    const res = await axios.patch(`${url}/food/food-edit/${id}`, formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${url}/order/all-orders`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const changeOrderStatus = async (status, id) => {
  try {
    const res = await axios.get(
      `${url}/order/status?status=${status}&id=${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
