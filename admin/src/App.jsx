import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddItem from "./Components/pages/AddItem/AddItem";
import ListItem from "./Components/pages/ListItem/ListItem";
import Orders from "./Components/pages/Orders/Orders";
import Error from "./Components/404Error/Error";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <hr className="line" />
      <div className="app-container d-flex">
        <Sidebar />
        <Routes>
          <Route path="/add-item" element={<AddItem />}></Route>
          <Route path="/list-item" element={<ListItem />}></Route>
          <Route path="/list-item/edit/:id" element={<AddItem />} />
          <Route path="/order-item" element={<Orders />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
