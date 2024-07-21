import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./itemSlice";
export const store = configureStore({
  reducer: {
    food: foodReducer,
  },
});
