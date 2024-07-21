import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    id: "",
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  },
};
const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFoodItem: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setFoodItem } = foodSlice.actions;
export default foodSlice.reducer;
