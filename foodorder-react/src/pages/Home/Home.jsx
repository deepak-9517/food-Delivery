import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/Exploremenu/ExploreMenu";
import FoodDelivery from "../../components/FoodDelivery/FoodDelivery";
const Home = () => {
  const [menuItem, setMenuItem] = useState("All");

  return (
    <div className="home">
      <Header />
      <ExploreMenu menuItem={menuItem} setMenuItem={setMenuItem} />
      <FoodDelivery menu={menuItem} />
    </div>
  );
};

export default Home;
