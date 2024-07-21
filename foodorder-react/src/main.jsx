import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import FoodContextProvider from "./components/ContextApi/Context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FoodContextProvider>
      <ToastContainer />
      <App />
    </FoodContextProvider>
  </BrowserRouter>
);
