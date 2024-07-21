import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";
import PlaceOrder from "./components/Order/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./components/MyOrders/MyOrders";

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  return (
    <>
      {loginPopup ? <LoginForm setLoginPopup={setLoginPopup} /> : <></>}
      <div className="app">
        <Navbar setLoginPopup={setLoginPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/Orders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
